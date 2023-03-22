const Joi = require("joi");

const paramsSchema = Joi.object({
  listId: Joi.number().integer().required(),
  itemId: Joi.number().integer().required(),
});

exports.validateParams = function (params) {
  return paramsSchema.validate(params);
};
