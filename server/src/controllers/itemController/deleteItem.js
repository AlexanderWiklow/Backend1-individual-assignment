// Description: Delete a todo with the given ID for the logged in user
const {
  validateDeleteItem,
} = require("../validations/Items/validateDeleteItem");

const { pool } = require("../../../config");

exports.deleteItem = async (req, res) => {
  const listId = parseInt(req.params.listId, 10);
  const itemId = parseInt(req.params.itemId, 10);

  const { error } = validateDeleteItem(req.params);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const query = `DELETE FROM list_item WHERE id = ? AND list_id = ?`;

  pool.execute(query, [itemId, listId], async (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error deleting item");
    } else {
      res.status(200).send("Item deleted!");
    }
  });
};
