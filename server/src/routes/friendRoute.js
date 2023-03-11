const express = require("express");
const {
  getFriend,
} = require("../../src/controllers/friendController/getFriend.js");
const {
  postFriend,
} = require("../../src/controllers/friendController/postFriend.js");
const friendRoute = express.Router();

friendRoute.get("/", getFriend);

friendRoute.post("/", postFriend);

module.exports = friendRoute;
