// This file contains the logic for registering a new user

const { pool } = require("../../../config");
const {
  validateUsernamePassword,
} = require("../validations/validateUsernamePassword");
const hashPassword = require("../../middlewares/passwordHash");

// This function is used to register a new user
exports.register = async (req, res) => {
  // Validate the username and password with joi
  const validatedUser = validateUsernamePassword(req.body);

  // If the validation fails, send a 400 Bad Request response
  if (validatedUser.error) {
    res.status(400).send(validatedUser.error.details[0].message);
    return;
  }

  // Destructure the username and password from the validated user
  const { username, password } = validatedUser.value;

  // SQL query to check if the user already exists
  const sqlCheckUser = `
  SELECT COUNT(*) AS count
  FROM user
  WHERE username = ?
`;

  // SQL query to insert the user into the database
  const sqlInsertUser = `
  INSERT INTO user(username, password)
  VALUES (?, ?)
`;

  // Check if the user already exists
  pool.execute(sqlCheckUser, [username], async (error, results) => {
    if (error) {
      console.log(error);
      // Send a 500 Internal Server Error response
      res.send(500).send("Something went wrong while checking for user!");
      return;
    }

    const count = results[0].count;

    // If the user already exists, send a 409 Conflict response
    if (count > 0) {
      res.status(409).send(`Username: ${username} already exists!`);
      return;
    }

    // use the function hashPassword to hash the password before inserting it into the database with the help of bcrypt
    const hashedPassword = await hashPassword(password);

    // Insert the user into the database
    pool.execute(sqlInsertUser, [username, hashedPassword], (error, result) => {
      if (error) {
        console.log(error);
        // Send a 500 Internal Server Error response
        res.status(500).send("Something went wrong while inserting user!");
      } else {
        console.log("User created!");
        // Send a 201 Created response
        res.status(201).send("User created!");
      }
    });
  });
};
