//Get packages
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db')
const cors = require('cors');
const path = require('path');
const forceSsl = require('force-ssl-heroku');

//First connect to mongoose. 
connectDB();


//initialize express.
const app = express();
app.use(forceSsl);
app.use(cors());

//Body Parser
app.use(express.json({ extended: false }));
app.use(express.urlencoded({extended: false}));

//Search route
app.use('/api/products', require('./routes/products'));
//Call back URL route.
app.use('/api/results', require('./routes/results'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on ${PORT}`));