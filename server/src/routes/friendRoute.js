const express = require("express");
const {
  getFriend,
} = require("../../src/controllers/friendController/getFriend.js");
const {
  postFriend,
} = require("../../src/controllers/friendController/postFriend.js");
const {
  getAllUsers,
} = require("../../src/controllers/friendController/getAllUsers.js");
const {
  getFriendList,
} = require("../../src/controllers/friendController/getFriendList.js");
const friendRoute = express.Router();

friendRoute.get("/", getFriend);

friendRoute.post("/", postFriend);

friendRoute.get("/users", getAllUsers);

friendRoute.get("/list", getFriendList);

module.exports = friendRoute;
