const express = require("express");
const axios = require("axios");
const { check, validationResult } = require('express-validator');
const router = express.Router();
//Schema
const Order = require('../models/Order');

//Callbacks
const callbacks = require("../config/callbacks");

//ROUTE
let THEMISTO;

process.env.NODE_ENV === "PROD" ? THEMISTO = "https://themisto66.herokuapp.com/" : THEMISTO = "http://localhost:6000";


/*
@POST search PRODUCTS
Send the parameters needed - Search will be initiated by themisto, ganymede will store into MongoDB
*/



router.post("/search",[ 
    check("search.provider", "Please pass in a provider").not().isEmpty(),
    check("search.query", "Please provide a query").not().isEmpty(),
    check("search.callbackUrl", "Please pass in a callback url").not().isEmpty(),
    check("search.callbackUrl", "Invalid callback URL").isIn(callbacks)
],
async (req, res) => {
    //First try catch block, this will create the Mongo Doc, with initial params for the query, sent via req.body.

    //errors array
     const errors = validationResult(req);
    //If errors, send errors.
     if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }


    try {
        //Destructure body
        const {search} = req.body;
        //Create new mongo object to save
        const newOrder = new Order ({
            ...search,
            status: "received"
        });
        //Save to db
        const order = await newOrder.save();
        //Take out Id.  
        let id = order._id;
        console.log(id);

            try {
                order.status = "processing";
                await order.save();
                //Try to post a search to ganymede. If search is posted, then status is processing.
                let search = await axios.post( THEMISTO + "/api/search", order);
                res.send("search started");
            } catch (error) {
                //If there was an error with the search posting, then status will be failed, and we'll have an error via this catch.
                order.status = "failed";
                order.error = error;
                //Save the new status to mongo DB. Send Error.
                await order.save();
                res.status(500).send(("Themisto error \n", error));
            }
        

    } catch (error) {
        //If failure is here, its due to a mongo error, probably a connection or limit regarding the DB.
        res.status(500).send("MongoDB error, \n", error);

    }
})



router.get("/search-order/:id", async (req, res) => {
    let { id } = req.params;
    console.log(id)
    try {
        const order = await Order.findById(id);
        if(!order) {
            return res.status(404).json({msg: 'order not found'});
        }
        res.json(order);
        
    } catch (err) {
        console.error(err.message);
        // the following if statement is for a request made where the ObjectID is not a valid objectID format
        if(err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'object not found'});
        }
        res.status(500).send("server error");
    }
})

router.get('/search-orders/', async (req,res) => {
    try {
        const orders = await Order.find().sort({date: -1});
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
    
});


router.get('/search-orders/category/:id', async (req,res) => {
    try {
        const orders = await Order.find({
            'categories': {
                $in: [
                    req.params.id
                ]
            }
        }).sort({date: -1});
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
    
});





module.exports = router;