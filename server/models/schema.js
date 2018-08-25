var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    email: String,
    profile: {
      something: String,
      somethingElse: String
    }
  });
  schema.index({name: 'text', 'profile.something': 'text'});

  console.log("Hello world");