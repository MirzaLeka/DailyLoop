
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
    return console.log("Unable to connect to MongoDB server");
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // findOneAndUpdate

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5b37b5a0da53a812e39ff1fb') // query the object
    }, {
        $set : { // update operators. you can't just say completed true, you must use these operators (with $)
            completed: true // what do you want to change (update)
        }
    }, {
        returnOriginal: false // return original or return changed
    }
).then((result) => {
    console.log(result);
}); 

        /* Editing Sam Fisher */ 

    //     db.collection('users').findOneAndUpdate({
    //         born: 1955
    //     }, {
    //         $set: {
    //             born: 1957
    //         }
    //     }, {
    //         returnOriginal: false
    //     }
    // ).then((result) => {
    //     console.log(result)
    // });

/* 3 Arguments inside findOneAndUpdate method. All 3 are objects:
1. object we are targeting,
2. choose a method and add a property we want to change
3. return changed or return original
and once you are done, print result and display it in the console */


// db.collection('Users').findOneAndUpdate({
//     _id: new ObjectID('5b37814ae699a41c103c1191')
// },
// {
//     $inc: {
//         age: 1 // increases age property by one
//     },
//     $set: { // add another option just to play around
//         name: "Mirza",
//         location: "Sarajevo"
//     }
// }, 
// {
//     returnOriginal: false
// }
// ).then((result) => {
// console.log(result);
// });

     client.close();
 });