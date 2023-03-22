const Joi = require("joi");

exports.validatePostFriend = function (requestBody) {
  const postSchema = Joi.object({
    friendUsername: Joi.string().min(3).max(40).required(),
  });

  return postSchema.validate(requestBody);
};
