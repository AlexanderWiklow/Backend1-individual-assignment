// Description: Update a todo with the given ID for the logged in user

const { pool } = require("../../../config");

exports.checkItem = async (req, res) => {
  const list_id = parseInt(req.params.list_id, 10);
  const id = parseInt(req.params.id, 10);

  const { completed } = req.body;

  const query = `UPDATE list_item SET completed = ? WHERE id = ? AND list_id = ?`;

  pool.execute(query, [completed, id, list_id], async (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error updating item");
    } else {
      res.status(200).send("Item updated!");
    }
  });
};
