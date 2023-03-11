const express = require("express");
const {
  createItem,
} = require("../../src/controllers/itemController/createItem.js");
const itemRoute = express.Router();

// // Get all items in a specific todo list
// itemRoute.get("/lists/:listId/items", itemController.getAllItems);

// Create a new item in a specific todo list
itemRoute.post("/lists/:listId/items", createItem);

// // Get a specific item in a specific todo list
// itemRoute.get("/lists/:listId/items/:itemId", itemController.getItem);

// // Update a specific item in a specific todo list
// itemRoute.put("/lists/:listId/items/:itemId", itemController.updateItem);

// // Delete a specific item in a specific todo list
// itemRoute.delete("/lists/:listId/items/:itemId", itemController.deleteItem);

module.exports = itemRoute;
