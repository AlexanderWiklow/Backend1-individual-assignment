// Update a list by id

const { pool } = require("../../../config");

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
        res.status(500).send("Error updating list");
      }
      // affectedRows is the number of rows that were changed by the query
      else if (result.affectedRows === 0) {
        res.status(404).send("List not found");
      } else {
        res.status(200).json(result);
      }
    }
  );
};
