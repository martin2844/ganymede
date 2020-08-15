const mongoose = require('mongoose');

const connectDB = () => {
    const mongoURI = "mongodb+srv://martin:algo1234@cluster0.pot2j.gcp.mongodb.net/ganymede?retryWrites=true&w=majority";
    mongoose.connect(mongoURI,{useUnifiedTopology: true, useNewUrlParser: true });
    console.log(mongoose.connection.readyState);
    return(mongoose.connection.readyState);
}


module.exports = connectDB;
