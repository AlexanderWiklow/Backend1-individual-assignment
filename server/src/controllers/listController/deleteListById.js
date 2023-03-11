const { pool } = require("../../../config");

// Delete a list by id
exports.deleteListById = async (req, res) => {
  const id = parseInt(req.params.listId, 10);
  const userId = req.loggedInUser.id;

  if (id === undefined) {
    res.status(400).send("Missing list id");
    return;
  }

  const query = `DELETE FROM list WHERE id = ? AND user_id = ?`;

  pool.execute(query, [id, userId], async (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send("List deleted!");
    }
  });
};
