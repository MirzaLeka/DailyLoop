const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        unique: true
    },
    email: {
        type: String, 
        required: true, 
        minlength: 1, 
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }   
    },
    password: {
        type: String,
        require: true,
        minlength: 8
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

module.exports = {User};