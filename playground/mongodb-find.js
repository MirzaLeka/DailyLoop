
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
    return console.log("Unable to connect to MongoDB server");
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

  /*  db.collection('Todos').find({
       _id: new ObjectID("5b36768b351803290cb70808")
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));

    }, (err) => {
        console.log(`Unable to fetch todos ${err}`)
    }); */

    /* .find() method returns everything in the selected collection 'Todos'.
    We can query the results by creating an object and setting props to a specific value, like:
    .find({ completed: true }). This will only return values with property completed set to true.

    We can also query using object id. Like above we set id to a specific value like
    .find({_id: new ObjectID('value')})
    And this will only return one result, because each object has a unique id.

    If we mistype and value we queried is not in the db, we'll get an empty array. 
    And of course we use toArray to retrieve all files within an array.
    */


    // We can use count to count amount of objects in our collection
 
 /*   db.collection('Todos').find().count().then((count) => {
     console.log(`Todos count: ${count}`);

 }, (err) => {
     console.log(`Unable to fetch todos ${err}`)
 }); */

 db.collection('Users').find({age: 24}).toArray().then((docs) => {
     console.log("Users:\n" + JSON.stringify(docs, undefined, 2));
 }, (err) => {
     if (err) {
         console.log(`Unable to fetch todos ${err}`);
     }
 });

 //   client.close(); <- dow't want to close connection to db once we fetch data (this is optional of course)
});