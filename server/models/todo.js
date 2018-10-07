var mongoose = require('mongoose'); 


var Todo = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
        trim: true
    },
    description: {
        type: String,
        required: false,
        minlength: 0,
        maxlength: 2000,
        trim: true,
        default: ''
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
    lastUpdated: {
        type: Number
    },
    _creator: {
        required: true,
        type: mongoose.Schema.Types.ObjectId // type objectId
    }
}); 


  mongoose.model('Todo', Todo);
  
  module.exports = mongoose.model('Todo');
