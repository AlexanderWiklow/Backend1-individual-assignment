const Joi = require("joi");

exports.validateGetAllItems = function (requestBody) {
  const postSchema = Joi.object({
    listId: Joi.number().required(),
  });

  return postSchema.validate(requestBody);
};
