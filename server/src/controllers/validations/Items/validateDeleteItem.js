const Joi = require("joi");

exports.validateDeleteItem = function (requestBody) {
  const postSchema = Joi.object({
    listId: Joi.number().required(),
    itemId: Joi.number().required(),
  });

  return postSchema.validate(requestBody);
};
