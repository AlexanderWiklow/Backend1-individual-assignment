// const express = require("express");
const { pool } = require("../../../config");

// Create a new item for the specified list
exports.createItem = async (req, res) => {
  //   console.log("list_id: ", list_id);

  const { title, description, completed, list_id } = req.body;

  const query = `INSERT INTO list_item (title, description, completed, list_id) VALUES (?, ?, ?, ?)`;

  pool.execute(
    query,
    [title, description, completed, list_id],
    async (error, result) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.send("Item created!");
      }
    }
  );
};
