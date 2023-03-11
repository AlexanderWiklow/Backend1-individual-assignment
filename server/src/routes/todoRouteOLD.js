const express = require("express");
const {
  createTodo,
} = require("../../src/controllers/todosController.js/createTodo.js");
const {
  deleteTodo,
} = require("../../src/controllers/todosController.js/deleteTodo.js");
const {
  getTodo,
} = require("../../src/controllers/todosController.js/getTodo.js");
const {
  updateTodo,
} = require("../../src/controllers/todosController.js/updateTodo.js");
const todoRoute = express.Router();

// Route to create a new todo for the logged in user
todoRoute.post("/", createTodo);

// Route to retrieve all todos for the logged in user
todoRoute.get("/", getTodo);

// Route to delete a todo with the given ID for the logged in user
todoRoute.delete("/:id", deleteTodo);

// Route to update a todo with the given ID for the logged in user
todoRoute.patch("/:id", updateTodo);

exports.todoRoute = todoRoute;
