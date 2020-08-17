const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
    const mongoURI = process.env.MONGO;
    mongoose.connect(mongoURI,{useUnifiedTopology: true, useNewUrlParser: true });
    console.log(mongoose.connection.readyState);
    return(mongoose.connection.readyState);
}


module.exports = connectDB;
