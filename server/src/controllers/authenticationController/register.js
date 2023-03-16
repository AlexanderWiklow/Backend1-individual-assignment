const { users } = require("../../../database");
const { pool } = require("../../../config");
const {
  validateUsernamePassword,
} = require("../validations/validateUsernamePassword");
const hashPassword = require("../../middlewares/passwordHash");

exports.register = async (req, res) => {
  const validatedUser = validateUsernamePassword(req.body);

  if (validatedUser.error) {
    res.status(400).send(validatedUser.error.details[0].message);
    return;
  }

  const { username, password } = validatedUser.value;

  console.log("username", username);

  const sqlCheckUser = `
  SELECT COUNT(*) AS count
  FROM user
  WHERE username = ?
`;

  const sqlInsertUser = `
  INSERT INTO user(username, password)
  VALUES (?, ?)
`;

  // Check if the user already exists
  pool.execute(sqlCheckUser, [username], async (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }

    const count = results[0].count;

    if (count > 0) {
      res.status(409).send(`Username: ${username} already exists!`);
      return;
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Insert the user into the database
    pool.execute(sqlInsertUser, [username, hashedPassword], (error, result) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        console.log("User created!");
        res.send("User created!");
      }
    });
  });
};
