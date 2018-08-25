var mongoose = require('mongoose'); // we are not importing mongose jjs fie. we are just requiring regular mongoose library.

/* Connection to DB  ==> This is in mongoose.js file now */
// mongoose.Promise = global.Promise; 
// mongoose.connect('mongodb://localhost:27017/TodoApp'); 

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
        trim: true,
        index: true
        // tags: { type: [String], index: true }
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

//Todo.index({text: "text"});

//  Todo.createIndexes({ text: "text" });

// Todo.ensureIndexes(function (err) {
//     if (err) return handleError(err);
//   });

module.exports = {Todo}; // We'll export our Todo to a file w need it in

/* Saving todos with Mongoose => This is in a different file now */

// var newTodo = new Todo({
//     text: "Charge phone"
// });

// newTodo.save().then((doc) => {
//     console.log("Saved todo", doc);
// }, (e) => {
//     console.log("Unable to save todo");
// });