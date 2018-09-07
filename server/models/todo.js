var mongoose = require('mongoose'); // we are not importing mongose js fie. we are just requiring regular mongoose library.


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
    lastUpdated: {
        type: Number
    },
    someNew: {
        type: String,
        default: null
    },
    align: {
       type: String, 
       default: "List"
    },
    // display: {
    //     type: String,
    //     default: "All"
    // },
    // sort: {
    //     type: String,
    //     default: "Date created"
    // },
    // limit: {
    //     type: String,
    //     default: "No limit"
    // },
    selectedTag: {
        type: Number,
        default: 0
    }
}); 


  mongoose.model('Todo', Todo);
  
  module.exports = mongoose.model('Todo');
