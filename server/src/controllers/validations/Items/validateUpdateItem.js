const Joi = require("joi");

exports.validateUpdateItem = function (requestBody) {
  const postSchema = Joi.object({
    description: Joi.string().min(1).max(200).required(),
  });

  return postSchema.validate(requestBody);
};
