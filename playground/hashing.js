const {SHA256} = require('crypto-js');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

var password = "123abc!";


/* Salting (adding some random values to pw) password above using bcryptjs */

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash); // 10 = amount of random values we want. The less, the better for the API, but you can put 120 if you want :)
    });
});

/* Comparing hashed PW with original using bcryptjs.compare */

var hashedPassword = '$2a$10$5C.zNBEZT6xR.wKfWiTt3ucsgXlw1l4Yt5JE0ruM0lexJooVtmRIa'

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res); // if password & hashedPassword match this will log out true
});

// We'll compare passwords when user logs in



// var data = {
//     id : 10
// };

// jwt.sign(data, "123abc"); // data + secret

// let token = jwt.sign(data, "123abc");
// console.log("Hash: ", token);

// let decoded = jwt.verify(token, "123abc"); // token (data) + secret
// console.log("Decoded: ", decoded);

// var message = "Mirza";
// var hash = SHA256(message).toString();

// console.log("message: " + message);
// console.log("Hash: "  + hash);

// let data = {
//     id: 4
// }

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log("Data was not changed");
// } else {
//     console.log("Data was changed. Don't trust!");
// }