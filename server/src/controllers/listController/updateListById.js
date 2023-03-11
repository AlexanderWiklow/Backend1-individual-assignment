const { pool } = require("../../../config");

// Update a list by id
exports.updateListById = (req, res) => {
  const userId = req.loggedInUser.id;
  const listId = parseInt(req.params.listId, 10);
  const { name } = req.body;

  if (!name) {
    res.status(400).send("Missing list name");
    return;
  }

  pool.execute(
    "UPDATE list SET name = ? WHERE id = ? AND user_id = ?",
    [name, listId, userId],
    (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else if (result.affectedRows === 0) {
        res.status(404).send("List not found");
      } else {
        res.send("List updated!");
      }
    }
  );
};
