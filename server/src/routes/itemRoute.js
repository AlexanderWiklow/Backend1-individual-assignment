const express = require("express");
const {
  createItem,
} = require("../../src/controllers/itemController/createItem.js");
const {
  getAllItems,
} = require("../../src/controllers/itemController/getAllItems.js");
const {
  deleteItem,
} = require("../../src/controllers/itemController/deleteItem.js");
const {
  updateItem,
} = require("../../src/controllers/itemController/updateItem.js");
const {
  updateItemCompleteStatus,
} = require("../../src/controllers/itemController/updateItemCompleteStatus.js");
const itemRoute = express.Router();

// Get all items in all todo lists
// itemRoute.get("/lists/items", getAllItems);

// Get all items in a specific todo list
itemRoute.get("/lists/:listId/items", getAllItems);

// Create a new item in a specific todo list
itemRoute.post("/lists/:listId/items", createItem);

// // Get a specific item in a specific todo list
// itemRoute.get("/lists/:listId/items/:itemId", itemController.getItem);

// Update a specific item in a specific todo list
itemRoute.patch("/lists/:listId/items/:itemId", updateItem);

// Delete a specific item in a specific todo list
itemRoute.delete("/lists/:listId/items/:itemId", deleteItem);

// Update the completed status of a specific item in a specific todo list
itemRoute.patch(
  "/lists/:listId/items/:itemId/completed",
  updateItemCompleteStatus
);

module.exports = itemRoute;
