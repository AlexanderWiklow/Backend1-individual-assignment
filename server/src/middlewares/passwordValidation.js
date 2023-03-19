// Description of the file: This file contains the validation for the password.

const bcrypt = require("bcrypt");

const validatePassword = async (password, hashedPassword) => {
  // bcrypt.compare returns a promise, so we need to await it to get the result
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = validatePassword;
