// This file is used to hash the password before it is saved in the database

const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  // generate a salt with 10 rounds and hash the password with the salt
  const salt = await bcrypt.genSalt(10);

  // bcrypt.hash returns a promise, so we need to await it to get the hashed password
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = hashPassword;
