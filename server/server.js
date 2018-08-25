const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


/* Home Page */

app.get("/", function(req, res)
{
res.sendFile("index.html", {"root": __dirname + "/../Web-Info"}); 
    });

app.get("/home", (req, res) => {
res.sendFile("index.html", {"root": __dirname + '/../Web-Info'});
    });

/* Static files */

app.use(express.static(__dirname + '/../Web-Info', { 
  extensions: ['html', 'htm'] 
  }));
  
/* Resources */

app.use("/Resources", express.static(__dirname + '/../Resources')); 




/* Routing */



/* Post todo */

app.post('/todos', (req, res) => {


//   var todo = new Todo({
//     text: req.body.text
//   });

// res.send({
//   type: "POST",
//   text: req.body.text,
//   createdAt: d
// });

  var d = new Date();
  var str = d.toString();
  str = str.substr(4,20);

  var todo = new Todo({
    text: req.body.text,
    createdAt: str

  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


/* Get all todos */

app.get('/todos', (req, res) => {

  // var newText = 'Mirza';

  // if (newText == null) {

  //   Todo.find({text: /Mirza/}).sort({completedAtTimestamp: 1}).then((todos) => {
  //     res.send({todos}); 
  //   }, (e) => { 
  //     res.status(400).send(e);
  //   });

  // } else {

  //  Todo.createIndex( { subject: "text" } )

    Todo.find().sort({completedAtTimestamp: 1}).then((todos) => {
      res.send({todos}); 
    }, (e) => { 
      res.status(400).send(e);
    });

  // }


});


/* Get todos by text */

app.get("/todos/:text/:completed/:limit", (req, res) => {
var text1 = req.params.text;
var getCompleted = req.params.completed;
var limit = req.params.limit;

console.log(limit);

var isCompleted;

if (getCompleted == "Completed") {
  isCompleted = true;
}
else if (getCompleted == "Not completed") {
  isCompleted = false;
}
else {
  isCompleted = '';
}

// ? optional char if no one enters text and clicks SEARCH
// by default search for first item in array
// if todos array is empty alert user that there is nothing in db  -- or if there is no such item
// maybe just print paragraph instead of alert


if ( typeof(isCompleted) === 'boolean' ) {

  Todo.find( { text: text1, completed: isCompleted } ).limit(Number(limit)).then((todos) => {
    res.send({todos}); 
  }, (e) => { 
    res.status(400).send(e);
  });
  

} else {

  Todo.find( { text: text1 } ).limit(Number(limit)).then((todos) => {
    res.send({todos}); 
  }, (e) => { 
    res.status(400).send(e);
  });
  

}

//TodoApp.todos.createIndex( { name: "text" } );

// { $text: { $search: text1 } }

//res.send(getText);



});




/* Šatch todo by id */

app.patch('/todos/:id', (req, res) => {

  var id = req.params.id;
  
  // values we want to change are in array
  var body = _.pick(req.body, ['text', 'completed', 'someNew']); //what user can edit. Make a Patch with text/compled/completedAt and write it in here. maybe the same for timestamp?
  
  if (!ObjectID.isValid(id)) {
   return res.status(400).send('Id is not valid'); 
  }
  
  // if completed is boolean and is completed then give date of completion to completeAt (remove null)
  if (_.isBoolean(body.completed) && body.completed) {

    var d = new Date();
    var str = d.toString();
    str = str.substr(4,20);
    
    body.completedAt = str; 
    body.completedAtTimestamp = d.getTime();

  } else {
    body.completed = false;
    body.completedAt = null;
    body.completedAtTimestamp = null;
  }
  
  // set body and return new (changed) value
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
  
  if (!todo) {
  return res.status(404).send();
  }
  res.send({todo});
  
  }).catch((e) => {
  res.status(400).send();
  });
  
  });


/* Delete one todo by id */

app.delete("/todos/:id", (req, res) => {

  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("Invalid id");
  }
  
  Todo.findByIdAndRemove(id).then((todo) => {

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    res.send({todo});

  }).catch((e) => {
    res.status(400).send("Bad request");
  });

});


/* Delete all todos */

app.delete("/todos", (req, res) => {

  Todo.remove({}).then((result) => {});

});


/* Port */

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
