const joi = require("joi");

exports.validateUsernamePassword = function (requestBody) {
  const postSchema = joi.object({
    username: joi.string().min(3).max(20).required(),
    password: joi.string().min(6).max(30).required(),
  });

  return postSchema.validate(requestBody);
};
