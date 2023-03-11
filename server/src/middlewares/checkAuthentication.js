const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.checkAuthentication = function checkAuthentication(req, res, next) {
  const secret = `${process.env.SECRET}`;

  // Get the authToken cookie
  const authToken = req.cookies.authToken;

  try {
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
