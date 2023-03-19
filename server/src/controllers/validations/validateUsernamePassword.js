// Description: This file contains the validation for the username and password.

// require the joi package to validate the username and password
const joi = require("joi");

// export the validation function
exports.validateUsernamePassword = function (requestBody) {
  // create a schema for the username and password
  const postSchema = joi.object({
    username: joi.string().min(3).max(20).required(),
    password: joi.string().min(6).max(30).required(),
  });

  // return the validation result
  return postSchema.validate(requestBody);
};
