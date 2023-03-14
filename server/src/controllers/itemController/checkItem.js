const { pool } = require("../../../config");

// Update a todo with the given ID for the logged in user
exports.checkItem = async (req, res) => {
  const list_id = parseInt(req.params.list_id, 10);
  const id = parseInt(req.params.id, 10);

  const { completed } = req.body;

  const query = `UPDATE list_item SET completed = ? WHERE id = ? AND list_id = ?`;

  pool.execute(query, [completed, id, list_id], async (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send("Item updated!");
    }
  });
};
