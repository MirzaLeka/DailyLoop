var mongoose = require('mongoose'); // we are not importing mongose jjs fie. we are just requiring regular mongoose library.


var Todo = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
        trim: true
    },
    completed: {
        type: Boolean, 
        default: false 
    },
    createdAt: {
        type: String
    },
   createdAtTimestamp: {
    type: Number,
    default: null
   },
    completedAt: {
        type: String, 
        default: null  
    },
    completedAtTimestamp: {
        type: Number,
        default: null
    },
    someNew: {
        type: String,
        default: null
    }
}); 


  mongoose.model('Todo', Todo);
  
  module.exports = mongoose.model('Todo');
