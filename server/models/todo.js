var mongoose = require('mongoose'); // we are not importing mongose jjs fie. we are just requiring regular mongoose library.

/* Connection to DB  ==> This is in mongoose.js file now */
// mongoose.Promise = global.Promise; 
// mongoose.connect('mongodb://localhost:27017/TodoApp'); 

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true 
    },
    completed: {
        type: Boolean, 
        default: false 
    },
    completedAt: {
        type: String, 
        default: null  
    }
}); 


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