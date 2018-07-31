var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.get("/", function(req, res)
{
res.sendFile("index.html", {"root": __dirname}); 
});

app.post('/todos', (req, res) => {

  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    // res.send(e);
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos}); // we get what ever is inside the request /todos (all todos) and we save it inside var todos (it can have any name ofc)
  }, (e) => { // and once we pull off GET request on frontend, our data will be stored in variable todos, just like we named it
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
