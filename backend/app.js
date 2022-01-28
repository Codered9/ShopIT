const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')
const fileUpload = require('express-fileupload')
const payment = require('./routes/payment')
const path = require('path')
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(fileUpload())
// Configuring Cloudinary
cloudinary.config({ 
  cloud_name: 'dlaxur3io', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:  process.env.CLOUDINARY_SECRET_KEY
});

// Setting up config files
if(process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').dotenv.config({path: 'backend/config/config.env'})
}

//Importing all the routes
const products = require('./routes/product.js');
const auth = require('./routes/auth')
const order = require('./routes/order');
const req = require('express/lib/request');
app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);

if(process.env.NODE_ENV !== 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
  })
}

//Middleware to handle errors.
app.use(errorMiddleware);

module.exports = app