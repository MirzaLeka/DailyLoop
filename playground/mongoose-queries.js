const {mongoose} = require ('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');

var id = "5b609380aedeae23fcfa9de2";

// We can check if id is valid before it gets to querying usingn ObjectID.isValid function
if (!ObjectID.isValid(id)) {
    console.log("ID not valid"); 
}

// To query data with Mongoose we use Todo.find() and attach promise with then()
Todo.find({ // we type that what we want to query, like with mongodb find
    _id: id // unlike mongodb syntax mongoose takes our string and coverts it into object ID
}).then((todos) => {
    console.log("Todos", todos); // put all data into todos variable like we did with get route
});

// find() matches all.
// findOne() returns the only one that matches query

Todo.findOne({ 
    _id: id 
}).then((todos) => {
    console.log("Todos", todos); 
});

// To find item by id, like above, the best approach is to use findById method, which does not require us to query id (obviously)

Todo.findById(id).then((todos) => {
    if (!todos) {
        return console.log("ID not found"); // if id is correct but doesn't exist in pur DB
    }
    console.log("Todos", todos); 
}).catch((e) => {
    console.log(e); // if id is incorrect
});

// More fun stuff: http://mongoosejs.com/docs/guide.html