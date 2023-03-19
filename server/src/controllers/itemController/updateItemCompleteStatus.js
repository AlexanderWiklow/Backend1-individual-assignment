// Description: Update the completed status of a todo item

const { pool } = require("../../../config");

exports.updateItemCompleteStatus = async (req, res) => {
  const listId = parseInt(req.params.listId, 10);
  const itemId = parseInt(req.params.itemId, 10);

  const { completed } = req.body;

  const query = `UPDATE list_item SET completed = ? WHERE id = ? AND list_id = ?`;

  pool.execute(query, [completed, itemId, listId], async (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error updating item");
    } else {
      res.status(200).json(result);
    }
  });
};
