const { pool } = require("../../../config");

// Delete a todo with the given ID for the logged in user
exports.deleteItem = async (req, res) => {
  const listId = parseInt(req.params.listId, 10);
  const itemId = parseInt(req.params.itemId, 10);
  // const userId = req.loggedInUser.id;

  const query = `DELETE FROM list_item WHERE id = ? AND list_id = ?`;

  pool.execute(query, [itemId, listId], async (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send("Item deleted!");
    }
  });
};
