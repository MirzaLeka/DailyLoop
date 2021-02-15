module.exports.stripHTMLTags = (props) => {

  Object
    .keys(props)
    .forEach(key => props[key] = props[key].replace(/(<([^>]+)>)/ig,''));

  return props;
}

module.exports.validateId = (req, res, next) => {

  if (!req.params._id || !ObjectID(req.params._id)) {
    return createError(400, 'Invalid data provided');
  }

  next();
}
