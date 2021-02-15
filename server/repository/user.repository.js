const createError = require('http-errors');
const { User } = require('../models/user');
const { welcomeEmail } = require('../service/email.service');

module.exports.createUser = async ({ username, email, password }) => {

  const user = await new User({
    username,
    email,
    password,
    dateCreated: new Date()
  }).save();

  const token = await user.generateAuthToken();
  welcomeEmail(body.email);

  return { user, token };
}

module.exports.loginUser = async ({ email, password }) => {

  const user = await User.findByCredentials(email, password);

  if (!user) {
    return createError(404, 'User not found');
  }

  const token = await user.generateAuthToken();
  return { user, token };
}

module.exports.logoutUser = async ({ email, password }) => {

//   const user = await User.findByCredentials(email, password);

//   if (!user) {
//     return createError(404, 'User not found');
//   }

//   const token = await user.generateAuthToken();
//   return { user, token };
}
