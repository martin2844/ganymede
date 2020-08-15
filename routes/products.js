const express = require("express");
const axios = require("axios");
const router = express.Router();
//Schema
const Order = require('../models/Order');

/*
@POST search PRODUCTS
Send the parameters needed- Search will be initiated by themisto, ganymede will store into MongoDB
*/
router.post("/search", async (req, res) => {
    try {
        //Destructure body
        const {search} = req.body;
        //Create new mongo object to save
        const newOrder = new Order ({
            ...search,
            status: "processing"
        });
        //Save to db
        const order = await newOrder.save();
        //Take out Id.  
        let id = order._id;
        console.log(id);

            try {
                let search = await axios.post("http://localhost:6000/search", order);
                res.send("search started");
            } catch (error) {
                res.send(error);
            }
        

    } catch (error) {
        res.send(error);

    }
})


module.exports = router;