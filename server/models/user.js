const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        unique: true,
        default: ''
    },
    email: {
        type: String, 
        required: true, 
        minlength: 1, 
        trim: true,
        unique: true,
        default: '',
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

/* We'll override results because we don't to send hashed PW and tokn back to user */

UserSchema.methods.toJSON = function() {

    var user = this;
    var userObject = user.toObject(); // takes mongoose variable (user) and converts into regular object

    /* We'll use lodash pick to pick what we want send back */

    return _.pick(userObject, ['_id', 'username', 'email']);

}

UserSchema.methods.generateAuthToken = function() { // instance functions // arrow functions don't bind this keyword
var user = this; // same idenfifier as user in other files

/* Creating new token */

var access = 'auth';
var token = jwt.sign({_id: user._id.toHexString(), access}, "abc123").toString(); // access : access inside {}

/* We push new object into tokens array with params defined above */

user.tokens = user.tokens.concat([{access, token}]); 

/* Now we need to save changes we updated above */

return user.save().then(() => {
    return token; 
}); // last then((token) => {}) we used everywhere before will be chained in server file so we don't need it here

};

/* Used for model methods, unlike previous which were used for instance methods */
UserSchema.statics.findByToken = function (token) {
    var User = this;

    // instance methods get called with induvidual documents
    // model methos get called with modelas this binding

    var decoded;

    try {
        decoded = jwt.verify(token, "abc123"); // try and catch if jwt verification fails
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject(); // if error we'll always reject so our success field will never fire
        // });
        return Promise.reject(); // same thing, simplified // text inside reject() parentheses will be our error e in server.js file /users/me
    }

    // find by token is now completed

    // if verification succeeded

    return User.findOne({
        '_id': decoded._id,
        'tokens.token' : token,
        'tokens.access' : 'auth' 
    });

};

var User = mongoose.model('User',UserSchema);

module.exports = {User};