const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name."],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 letters."]
    },
    price: {
        type: Number,
        required: [true, "Please enter product number."],
        maxLength: [5, "Product price cannot exceed 5 letters."],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description."]
    },
    ratings: {
        type: Number,
        default: 0.0
    },
    images: 
        [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        category: {
            type: String,
            required: [true, 'Please specify the category of the product.'],
            enum: {
                values: [
                    'Fashion',
                    'Home',
                    'Mobiles',
                    'Electronics',
                    'Essentials',
                    'Book, Toys',
                    'Grocery',
                    'Appliances',
                    'Food'
                ],
                message: 'Please specify valid category of the product.'
            }
        },
        seller: {
            type: String,
            required: [true, 'Please specify the seller name for the product.']
        },
        stock: {
            type: Number,
            required: [true],
            maxLength: [5, 'Product stock cannot exceed 5 digits.'],
            default: 0
        },
        numofReviews: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'User',
                    required: true
                },
                name:{
                    type: String,
                    required: true
                },
                rating: {
                    type: Number,
                    required: true,
                    
                },
                comment: {
                    type: String,
                    required: true
                }
            }
        ],
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    
})

module.exports = mongoose.model('Product', productSchema)