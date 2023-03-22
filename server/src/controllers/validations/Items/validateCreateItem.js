const Joi = require("joi");

exports.validateCreateItem = function (requestBody) {
  const postSchema = Joi.object({
    description: Joi.string().min(1).max(200).required(),
    completed: Joi.boolean().required(),
    list_id: Joi.number().required(),
  });

  return postSchema.validate(requestBody);
};
