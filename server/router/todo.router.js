const router = require('express').Router();
const { validateRegister, validateLogin } = require('../middleware/validators/credentials');
const { createUser, loginUser } = require('../repository/user.repository');

router

  .post('/register', validateRegister, async (req, res, next) => {

    try {
      const { user, token } = await createUser(req.body);
      res.status(201).header('x-auth', token).send(user);

    } catch(e) {
      next(e);
    }

  })

  .post('/login', validateLogin, async (req, res, next) => {

    try {

      const { user, token } = await loginUser(req.body);
      res.header('x-auth', token).send(user);

    } catch (e) {
      next(e);
    }

  })

module.exports = router;
