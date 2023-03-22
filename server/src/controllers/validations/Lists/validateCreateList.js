const Joi = require("joi");

exports.validateCreateList = function (requestBody) {
  const postSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
  });

  return postSchema.validate(requestBody);
};
