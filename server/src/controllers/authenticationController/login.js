const { pool } = require("../../../config");
// används för att få åtkomst till en .env-fil
// const dotenv = require("dotenv");
// dotenv.config();

// jwt is a npm package that is used to create and verify tokens
// tokens are used to verify that the user is logged in
const jwt = require("jsonwebtoken");

// require the password validation middleware to validate the password when the user logs in with the help of bcrypt compare to compare the password from the request with the password from the database
const validatePassword = require("../../middlewares/passwordValidation");

const {
  validateUsernamePassword,
} = require("../validations/validateUsernamePassword");

exports.login = async (req, res) => {
  const secret = `${process.env.SECRET}`;

  const validatedUser = validateUsernamePassword(req.body);

  if (validatedUser.error) {
    res.status(400).send(validatedUser.error.details[0].message);
    return;
  }

  const { username, password } = validatedUser.value;

  // query MySQL database to find user
  const query = `SELECT * FROM user WHERE username = ?`;
  pool.execute(query, [username], async (error, results) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }

    if (results.length > 0) {
      const dbPassword = results[0].password;
      const foundUser = results[0];

      // Validate the password
      const isPasswordValid = await validatePassword(password, dbPassword);

      if (isPasswordValid) {
        const copyOfUser = { ...foundUser };
        delete copyOfUser.password;

        // create a token
        const authToken = jwt.sign(copyOfUser, secret, {
          expiresIn: "24h",
        });

        res.cookie("authToken", authToken, {
          maxAge: 19360000,
          sameSite: "none",
          secure: true,
          httpOnly: true,
        });

        res.status(200).send("Logged in successfully!");
        return;
      }
    }

    res.status(401).send("Invalid username/password");
  });
};
