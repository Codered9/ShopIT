const Product = require('../models/product')
const cloudinary = require('cloudinary')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeature')
//Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];
    if(typeof(req.body.images) === 'string'){
        images.push(req.body.images);
    }
    else{
        images = req.body.images;
    }
    
    let imagesLinks = []; 
    for(let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        })
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

//Get all the products from the database => /api/v1/products.

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    const resperpage = 4;
    const productCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;
    if (!filteredProductsCount) {
        apiFeatures.pagination(resperpage)
    }
    products = await apiFeatures.query.clone();

    setTimeout(() => {

        res.status(200).json({
            success: true,
            productCount,
            resperpage,
            filteredProductsCount,
            products
        })
    }, 1000)
})

//Get all the products for Admin => /api/v1/admin/products.
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {


    const products = await Product.find();

        res.status(200).json({
            success: true,
            products
        })
    
})

// Get a single product using id from database.

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})


// Update product => /api/v1/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }
    let images = [];
    if(typeof(req.body.images) === 'string'){
        images.push(req.body.images);
    }
    else{
        images = req.body.images;
    }
    
    if(images !== undefined) {
        // Deleting images related to product 
    for(let i = 0; i< product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    let imagesLinks = []; 
    for(let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        })
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagesLinks;
    }
    
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

// Delete Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }

    // Deleting images related to product 
    for(let i = 0; i< product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product is deleted."
    })
})

// Create new review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    }
    else {
        product.reviews.push(review);
        product.numofReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
})

// Get Product Reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Reviews => /api/v1/reviews
exports.deleteProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())

    const numofReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.id, {
        reviews,
        ratings,
        numofReviews
    }, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true
    })
})

