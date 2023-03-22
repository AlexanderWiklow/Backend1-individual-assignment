const Joi = require("joi");

exports.validateGetListById = function (requestBody) {
  const postSchema = Joi.object({
    listId: Joi.number().required(),
  });

  return postSchema.validate(requestBody);
};
