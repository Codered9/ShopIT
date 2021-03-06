const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name.'],
        maxLength: [30, 'Name Length Should not Exceed 30 Characters.']
    },
    email: {
        type: String,
        required: [true, 'Please enter you email address.'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address.']

    },
    password: {
        type: String,
        required: [true, 'Please enter your password.'],
        minlength: [8, 'Your password must be longer than 8 characters.'],
        select: false        
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})
//Encrypt Password before saving User
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10);
})

//Compares Password with the entered password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
//Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// Generate Reset Password Token
userSchema.methods.getResetPasswordToken = function () {
    // Generate Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
    
    return resetToken
}


module.exports = mongoose.model('User', userSchema);