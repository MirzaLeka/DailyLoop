var mongoose = require('mongoose');

mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://<Spy4er>:<Bu11$Eye44>@ds111113.mlab.com:11113/todoapp'); 

// 'mongodb://localhost:27017/TodoApp'

module.exports = {mongoose};
// instead of configuring server and mongoose in file, we made a separate file for mongoose that we'll include in server.js file
// user and todo models are in model folder