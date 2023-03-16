const { pool } = require("../../../config");

// Update a todo with the given ID for the logged in user
exports.updateItem = async (req, res) => {
  const listId = parseInt(req.params.listId, 10);
  const itemId = parseInt(req.params.itemId, 10);

  const { description } = req.body;

  const query = `UPDATE list_item SET description = ?  WHERE id = ? AND list_id = ?`;

  pool.execute(query, [description, itemId, listId], async (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send("Item updated!");
    }
  });
};
