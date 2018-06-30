var mongoose = require('mongoose');

// we're adding built in Promises library to mongoose
mongoose.Promise = global.Promise; 

// Like with mongodb script we first need to connect using mongoose and the same url
mongoose.connect('mongodb://localhost:27017/TodoApp'); // that's it. No need to add callbacks.

// We'll create a mongoose model of everything want to store, give it properties 
// The first argument is name of the model and second is object we're creating and properties we are giving it. 
// Props are also objs in which we define props using various attributes

/*
var Todo = mongoose.model('Todo', {
    text: {
        type: String, // text will be a String, obviously
        required: true, // now if we don't enter any String, nothing will be stored into DB
        minlength: 1, // minimum one character
        trim: true // trim trims off white space in the beginning and the end of the string
    },
    completed: {
        type: Boolean, // completed, yes, not?
        default: false // if we don't say is it done, it will be set to not done - false
    },
    completedAt: {
        type: Number, // finished at, when? - Timestamp
        default: null  // if it's not completed then completedAt should be null
    }
}); */

// We now have a working Todo model. Now we're gonna add one Todo

/*
var otherTodo = new Todo({
text: 'Cook dinner' // giving a text property a value
}); */

/*

otherTodo.save().then((doc) => {
    console.log(`Saved todo: ${doc}`);
}, (e) => {
    console.log(`Unable to save todo.`);
});

*/



/*
var newTodo = new Todo({
    text: 'Get some sleep',
    completed: false,
    completedAt: 1530393660 
    }); */

// Creating a new instance of Todo, like we did above, will not update the DB. 
// To post something to DB we need to make the following method:
/*
newTodo.save().then((doc) => {
    console.log(`Saved todo: 
    ${JSON.stringify(doc, undefined, 2)}`);
    
}, (e) => {
    console.log(`Unable to save todo: ${e}`);
}); */

// We called a save method and chained a promise to it


// practice course

var User = mongoose.model('User', {
    email: {
        type: String, 
        required: true, 
        minlength: 1, 
        trim: true 
    }
});

    var user = new User({
    email: 'myfake@email.com'
    }); 


    user.save().then((doc) => {
    console.log(`Saved user: 
    ${JSON.stringify(doc, undefined, 2)}`);
    
}, (e) => {
    console.log(`Unable to save todo: ${e}`);
}); 



