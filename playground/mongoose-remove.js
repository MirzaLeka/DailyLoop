const {mongoose} = require ('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');

// Delete multiple or all records
Todo.remove({}).then((result) => {
    console.log(result);
});

// Delete just one record
Todo.findOneAndRemove({
    text: "Training"
}).then((todo) => {
    console.log(todo);
});

// Delete one record by id
Todo.findByIdAndRemove("5b62d8c1bdc741a68d1a675f").then((todo) => {
console.log(todo);
});