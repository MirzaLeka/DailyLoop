var mongoose = require('mongoose');

// we're adding built in Promises library to mongoose
mongoose.Promise = global.Promise; 

// Like with mongodb script we first need to connect using mongoose and the same url
mongoose.connect('mongodb://localhost:27017/TodoApp'); // that's it. No need to add callbacks.

// We'll create a mongoose model of everything want to store, give it properties 
// The first argument is name of the model and second is object we're creating and properties we are giving it. 
// Props are also objs in which we define props using various attributes

var Todo = mongoose.model('Todo', {
    text: {
        type: String // text will be a String, obviously
    },
    completed: {
        type: Boolean // completed, yes, not?
    },
    completedAt: {
        type: Number // finished at, when? - Timestamp
    }
});

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

var newTodo = new Todo({
    text: 'Get some sleep',
    completed: false,
    completedAt: 1530393660 
    });

// Creating a new instance of Todo, like we did above, will not update the DB. 
// To post something to DB we need to make the following method:

newTodo.save().then((doc) => {
    console.log(`Saved todo: 
    ${JSON.stringify(doc, undefined, 2)}`);
    
}, (e) => {
    console.log(`Unable to save todo: ${e}`);
});

// We called a save method and chained a promise to it



