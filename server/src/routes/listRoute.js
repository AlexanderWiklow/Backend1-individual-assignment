const express = require("express");
const {
  createList,
} = require("../../src/controllers/listController/createList.js");
const {
  deleteListById,
} = require("../../src/controllers/listController/deleteListById.js");
const {
  getListById,
} = require("../../src/controllers/listController/getListById.js");
const { getList } = require("../../src/controllers/listController/getLists.js");
const {
  updateListById,
} = require("../../src/controllers/listController/updateListById.js");
const listRoute = express.Router();

// Endpoint for creating a new list
listRoute.post("/lists", createList);

// Endpoint for getting all lists for a user
listRoute.get("/lists", getList);

// Endpoint for getting a specific list by ID
listRoute.get("/lists/:listId", getListById);

// Endpoint for updating a specific list by ID
listRoute.patch("/lists/:listId", updateListById);

// Endpoint for deleting a specific list by ID
listRoute.delete("/lists/:listId", deleteListById);

module.exports = listRoute;
