var mongoose = require('mongoose');

mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://127.0.0.1:27017/TodoAppTest'); 

module.exports = {mongoose};
// instead of configuring server and mongoose in file, we made a separate file for mongoose that we'll include in server.js file
// user and todo models are in model folder