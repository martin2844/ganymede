const express = require("express");
const axios = require("axios");
const router = express.Router();

const Order = require('../models/Order');



router.post('/', async (req, res) => {
    const order = req.body;
    let willUpdate = await Order.findById(order._id);
    willUpdate.results = order.results;
    willUpdate.status = "done";
    await willUpdate.save()
    res.send("order updated, and done");
})







module.exports = router;