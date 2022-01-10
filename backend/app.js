const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')
const fileUpload = require('express-fileupload')
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(fileUpload())
// Configuring Cloudinary
cloudinary.config({ 
    cloud_name: 'dlaxur3io', 
    api_key: '218335879418224', 
    api_secret: 'HSC7X-4AYZTRvU-iykyZJEc0nW4' 
  });


//Importing all the routes
const products = require('./routes/product.js');
const auth = require('./routes/auth')
const order = require('./routes/order');
const req = require('express/lib/request');
app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
//Middleware to handle errors.
app.use(errorMiddleware);

module.exports = app