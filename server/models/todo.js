var mongoose = require('mongoose'); // we are not importing mongose jjs fie. we are just requiring regular mongoose library.

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
        type: Number, 
        default: null  
    }
}); 

module.exports = {Todo};