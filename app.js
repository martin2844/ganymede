//Get packages
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db')
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
//First connect to mongoose. 
connectDB();



//initialize express.
const app = express();
app.use(cors());

//Logger
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

//Body Parser
app.use(express.json({ extended: false, limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb' }));


//Search route
app.use('/api/products', require('./routes/products'));
//Call back URL route.
app.use('/api/results', require('./routes/results'));

app.get("/", (req, res) => {
    res.send("ganymede");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on ${PORT}`));