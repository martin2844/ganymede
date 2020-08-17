const express = require("express");
const axios = require("axios");
const router = express.Router();

const Order = require('../models/Order');



router.post('/', async (req, res) => {

    try {
        const order = req.body;
        let willUpdate = await Order.findById(order._id);
        console.log(willUpdate);
        willUpdate.results = order.results;
        willUpdate.categories = order.categories;
    
        if(order.results.error) {
            console.log("there was an error");
            willUpdate.status = "failed";
            willUpdate.error = order.results.error;
        } else {
            console.log("No errors, search done \n @@@@@ SEARCH ENDED @@@@ \n");
            willUpdate.status = "done";
        }
 
        let update = await willUpdate.save();
        res.send("order updated, and done");
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
 
})







module.exports = router;