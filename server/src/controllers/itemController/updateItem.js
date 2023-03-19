// Description: This file contains the updateItem function which updates an item in the database.

const { pool } = require("../../../config");

exports.updateItem = async (req, res) => {
  const listId = parseInt(req.params.listId, 10);
  const itemId = parseInt(req.params.itemId, 10);

  const { description } = req.body;

  const query = `UPDATE list_item SET description = ?  WHERE id = ? AND list_id = ?`;

  pool.execute(query, [description, itemId, listId], async (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error updating item");
    } else {
      res.status(200).json(result);
    }
  });
};
