// MongoDB module v3
//const MongoClient = require('mongodb').MongoClient; We can shorten this with ES6 Object destructuring
const {MongoClient, ObjectID} = require('mongodb');

/* Used to console log ObjectID
var obj = new ObjectID();
console.log(obj);
*/

// Connecting to the DB that we are creating at the same time
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
    return console.log("Unable to connect to MongoDB server");
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

// Mongo won't craete database until we create collection and start inserting data in it

// Inserting new Todo.
// We name the collection and choose function insertOne, where we'll insert and object with it's properties.
// Values of those properties will be stored in DB under object we created.
// We'll also get an _id from mongo. We can also set _id on our own.

    db.collection('Todos').insertOne({
        text: "Something to do",
        completed: false
    },
    (err, result) => {
        if (err) {
            return console.log(`Unable to insert todo ${result}`);
            } 
            // If everything went well we'll print all docs we inserted 
            console.log(JSON.stringify(result.ops, undefined, 2));
    });  

/*
    db.collection("Users").insertOne({
        name: "Alican",
        age: "Unknown",
        location: "Sarajevo"
    },
     (err, result) => {
        if (err) {
            return console.log(`Unable to insert user ${err}`);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));

    });  */

    client.close();
});