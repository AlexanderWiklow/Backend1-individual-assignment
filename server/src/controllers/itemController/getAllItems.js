// const express = require("express");
const { pool } = require("../../../config");

// Create a new item for the specified list
exports.getAllItems = async (req, res) => {
  // const userId = req.loggedInUser.id;
  const listId = parseInt(req.params.listId, 10);

  const query = `SELECT * FROM list_item WHERE list_id = ?`;

  pool.execute(query, [listId], async (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    }
    res.status(200).json(result);
  });
};
