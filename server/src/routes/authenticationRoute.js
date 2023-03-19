const express = require("express");
const { login } = require("../controllers/authenticationController/login");
const {
  register,
} = require("../controllers/authenticationController/register");

// Description: This file contains the routes for the authentication.
const authenticationRoute = express.Router();

authenticationRoute.post("/login", login);

authenticationRoute.post("/register", register);

exports.authenticationRoute = authenticationRoute;
