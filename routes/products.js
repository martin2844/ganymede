const express = require("express");
const axios = require("axios");
const router = express.Router();
//Schema
const Order = require('../models/Order');

/*
@POST search PRODUCTS
Send the parameters needed - Search will be initiated by themisto, ganymede will store into MongoDB
*/

router.post("/search", async (req, res) => {
    //First try catch block, this will create the Mongo Doc, with initial params for the query, sent via req.body.

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
                //Try to post a search to ganymede. If search is posted, then status is processing.
                let search = await axios.post("http://localhost:6000/search", order);
                order.status = "processing";
                await order.save();
                res.send("search started");
            } catch (error) {
                //If there was an error with the search posting, then status will be failed, and we'll have an error via this catch.
                order.status = "failed";
                order.error = error;
                //Save the new status to mongo DB. Send Error.
                await order.save();
                res.status(500).send("Themisto error \n", error);
            }
        

    } catch (error) {
        //If failure is here, its due to a mongo error, probably a connection or limit regarding the DB.
        res.status(500).send("MongoDB error, \n", error);

    }
})


module.exports = router;