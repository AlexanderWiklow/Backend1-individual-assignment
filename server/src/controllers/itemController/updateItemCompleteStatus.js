// itemController.js
const { pool } = require("../../../config");

// Update the completed status of a todo item
exports.updateItemCompleteStatus = async (req, res) => {
  const listId = parseInt(req.params.listId, 10);
  const itemId = parseInt(req.params.itemId, 10);

  const { completed } = req.body;

  const query = `UPDATE list_item SET completed = ? WHERE id = ? AND list_id = ?`;

  pool.execute(query, [completed, itemId, listId], async (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send("Item completed status updated!");
    }
  });
};
