const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    options: {
        type: Object,
    },
    callbackUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    results: {
        type: Array
    },
    error: {
        type: String,
    }
})

const Order = mongoose.model('order', OrderSchema);
module.exports = Order;