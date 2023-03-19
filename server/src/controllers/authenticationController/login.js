const { pool } = require("../../../config");

// jwt is a npm package that is used to create and verify tokens
// tokens are used to verify that the user is logged in
const jwt = require("jsonwebtoken");

// require the password validation middleware to validate the password when the user logs in with the help of bcrypt compare to compare the password from the request with the password from the database
const validatePassword = require("../../middlewares/passwordValidation");

const {
  validateUsernamePassword,
} = require("../validations/validateUsernamePassword");

exports.login = async (req, res) => {
  // get the secret from the environment
  const secret = `${process.env.SECRET}`;

  // validate the username and password
  const validatedUser = validateUsernamePassword(req.body);

  // if the validation fails, send a 400 Bad Request response
  if (validatedUser.error) {
    res.status(400).send(validatedUser.error.details[0].message);
    return;
  }

  // destructure the username and password from the validated user
  const { username, password } = validatedUser.value;

  // query MySQL database to find user
  const query = `SELECT * FROM user WHERE username = ?`;
  pool.execute(query, [username], async (error, results) => {
    // if there is an error, send a 500 Internal Server Error response
    if (error) {
      console.error(error);
      res.status(500).send("Something went wrong while checking for user!");
      return;
    }

    // if the user is found, validate the password
    if (results.length > 0) {
      const dbPassword = results[0].password;
      const foundUser = results[0];

      // Compare the password from the request with the password from the database
      const isPasswordValid = await validatePassword(password, dbPassword);

      // if the password is valid, create a token and send it to the client
      if (isPasswordValid) {
        const copyOfUser = { ...foundUser };
        delete copyOfUser.password;

        // create a token. The first argument is the payload, the second argument is the secret, and the third argument is the options
        const authToken = jwt.sign(copyOfUser, secret, {
          // when the token expires in 24 hours (86400 seconds) the user will have to log in again
          expiresIn: "24h",
        });

        // send the token to the client
        res.cookie("authToken", authToken, {
          // expiration time of the cookie. The cookie will be deleted after 5.5 hours.
          maxAge: 19360000,
          sameSite: "none",
          secure: true,
          httpOnly: true,
        });

        // send a 200 OK response
        res.status(200).send("Logged in successfully!");
        return;
      }
    }

    // if the user is not found or the password is invalid, send a 401 Unauthorized response
    res.status(401).send("Invalid username/password");
  });
};
