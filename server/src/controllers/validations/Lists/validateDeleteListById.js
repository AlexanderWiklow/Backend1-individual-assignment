const Joi = require("joi");

exports.validateDeleteListById = function (requestBody) {
  const postSchema = Joi.object({
    listId: Joi.number().required(),
  });

  return postSchema.validate(requestBody);
};
