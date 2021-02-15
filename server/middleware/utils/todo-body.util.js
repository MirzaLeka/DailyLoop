module.exports.validateTodoTitle = (title) => {
  if (!title || title.length > 100) {
    return false;
  }
  return true;
}

module.exports.validateTodoDesciption = (description) => {
  if (description.length > 2000) {
    return false;
  }
  return true;
}
