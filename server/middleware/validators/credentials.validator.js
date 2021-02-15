const createError = require('http-errors');
const { isEmail } = require('validator');

module.exports.validateRegister = (req, res, next) => {

  if (!req.body) {
    return createError(422, 'Invalid data provided');
  }

  req.body = stripHTMLTags(req.body);

  if (!validateUsername(req.body.username)) {
    return createError(400, 'Username must be at least 6 characters long and contain letters and numbers');
  }

  if (!validateEmail(req.body.email)) {
    return createError(400, 'Invalid email provided');
  }

  if (!validatePassword(req.body.password)) {
    return createError(400, 'Password must be at least 8 characters long and contain at least one number, one letter and one symbol');
  }

  next();
}

module.exports.validateLogin = (req, res, next) => {

  if (!req.body) {
    return createError(422, 'Invalid data provided');
  }

  req.body = stripHTMLTags(req.body);

  if (!validateEmail(req.body.email)) {
    return createError(400, 'Invalid email provided');
  }

  if (!validatePassword(req.body.password)) {
    return createError(400, 'Password must be at least 8 characters long and contain at least one number, one letter and one symbol');
  }

  next();
}

function stripHTMLTags(props) {

  Object
    .keys(props)
    .forEach(key => props[key] = props[key].replace(/(<([^>]+)>)/ig,''));

  return props;
}

function validateUsername(username) {
  if (!username || !validateRegex(username, 'username') || username.length < 6) {
    return false;
  }
  return true;
}

function validateEmail(email) {
  if (!email || !isEmail(email)) {
    return false;
  }
  return true;
}

function validatePassword(password) {
  if (!password || !validateRegex(password) || password.length < 8) {
    return false;
  }
  return true;
}

function validateRegex(value, key) {
  switch (key) {
    case 'username':
      return /\d/.test(value) && /[a-z]/i.test(value);
    default:
      return /\d/.test(value) && /[a-z]/i.test(value) && /[$-/:-?{-~!"^_`\[\]]/.test(value)
  }
}
