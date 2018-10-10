const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
    }],
    todosCreated: {
        type: Number,
        default: 0
    },
    todosCompleted: {
        type: Number,
        default: 0
    },
    rank: {
        type: String,
        default: "Unranked"
    }


});

/* We'll override results because we don't to send hashed PW and tokn back to user */

UserSchema.methods.toJSON = function() {

    var user = this;
    var userObject = user.toObject(); // takes mongoose variable (user) and converts into regular object

    /* We'll use lodash pick to pick what we want send back */

    return _.pick(userObject, ['_id', 'username', 'email', 'rank', 'todosCreated', 'todosCompleted']);

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

/* Deleting token when user logs out */

UserSchema.methods.removeToken = function (token) {
    var user = this;

  return user.update({
        $pull: {
            tokens: {token} // pull token that matche ours token
        }
    });

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

    /* Another model method */

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject(); // if there is no user no need to check does plain text PW matches the hashed one
        }

        return new Promise((resolve, reject) => { //bcrypt only supports callbacks, so we're creating new Promise so we cna continue using promises
        
            bcrypt.compare(password, user.password, (err, res) => {

                if (res) {
                    resolve(user);
                } else {
                    reject();
                }

            });
        });
    });

};


/* We'll hash password before we save doc to DB. That's why we're using pre keyword */

UserSchema.pre('save', function(next) { // we need next, otherwise code will never execute and middleware will crash
    var user = this; // equipping user, like in previous cases

    if ( user.isModified('password') ) { // returns boolean and checks if password is modified it's up to bcrypt to salt it

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash; // we are setting user password value to a hashed value of the same password
            next();
        });
    });

    } else {
        next();
    }

});



var User = mongoose.model('User',UserSchema);

module.exports = {User};