
const {MongoClient, ObjectID} = require('mongodb');



// Connecting to the DB that we are creating at the same time
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
    return console.log("Unable to connect to MongoDB server");
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // deleteMany - delete many objects at onces

    /*db.collection('Todos').deleteMany({
        text: "Eat lunch"
    }).then((result) => {
        console.log(result); 
    }); */

    // deleteOne - delete one object that matches the criteria and then it stops
 
    /*
    db.collection('Todos').deleteOne({
        text: "eat lunch"
    }).then((result) => {
        console.log(result);
    });
*/

    // findOneAndDelete - removes first object and returns deleted object so we can tell user which one deleted

    /*
    db.collection('Todos').findOneAndDelete({
        completed: false
    }).then((result) => {
        console.log(result);
    });
    */

    // Practice Course

    db.collection('Users').deleteMany({
        age: 24
    }).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b378aec3141ed29b8c06767')
    }).then((result) => {
        console.log(result);
    });




    // client.close();
});