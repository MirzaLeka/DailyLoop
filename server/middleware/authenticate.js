var {User} = require('./../models/user');

var authenticate = (req, res, next) => {

    var token = req.header('x-auth');
  
    /* This method will find user related to that token and return it in a promise */
    User.findByToken(token).then((user) => {
      if (!user) { // token was OK, but query couldn't find user
        return Promise.reject();
      }
  
      req.user = user;
      req.token = token;
      next();
  
    }).catch((e) => {
      res.status(401).send();
    });
  
  };

  module.exports = {authenticate};