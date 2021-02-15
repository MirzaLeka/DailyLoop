const createError = require('http-errors');
const { ObjectID } = require('mongodb');

module.exports.validateTodo = (req, res, next) => {

  if (!req.body) {
    return createError(422, 'Invalid data provided');
  }

  req.body = stripHTMLTags(req.body);

  if (!validateTodoTitle(req.body.title)) {
    return createError(400, 'Todo title needs to be within 100 characters long');
  }

  if (!validateTodoDesciption(req.body.description)) {
    return createError(400, 'Todo description needs to be within 2000 characters long');
  }

  next();
}

module.exports.validateId = (req, res, next) => {

  if (!req.params._id || !ObjectID(req.params._id)) {
    return createError(400, 'Invalid data provided');
  }

  next();
}
