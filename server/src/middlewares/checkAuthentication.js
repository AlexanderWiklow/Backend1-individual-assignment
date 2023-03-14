const jwt = require("jsonwebtoken");
require("dotenv").config();

// This middleware checks if the user is logged in or not with the help of the authToken cookie.
// If the user is logged in, the next middleware will be called.

exports.checkAuthentication = (req, res, next) => {
  // Get the secret from the .env file
  const secret = `${process.env.SECRET}`;

  // Get the authToken cookie
  const authToken = req.cookies.authToken;

  try {
    // Verify the token by using the secret and the token from the cookie and save the result in loggedInUser
    const loggedInUser = jwt.verify(authToken, secret);

    if ((req.loggedInUser = loggedInUser)) {
      next();
      return;
    }
  } catch (err) {
    console.log("JWT verification error:", err.message);
  }

  res.status(401).send("You must be logged in to do that!");
  return;
};
