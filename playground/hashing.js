const {SHA256} = require('crypto-js');
const jwt = require("jsonwebtoken");


var data = {
    id : 10
};

jwt.sign(data, "123abc"); // data + secret

let token = jwt.sign(data, "123abc");
console.log("Hash: ", token);

let decoded = jwt.verify(token, "123abc"); // token (data) + secret
console.log("Decoded: ", decoded);

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