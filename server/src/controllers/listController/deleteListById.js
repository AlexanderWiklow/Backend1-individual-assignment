// Description: Delete a list by id

const { pool } = require("../../../config");

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
      res.status(500).send("Error deleting list");
    } else {
      res.status(200).json(result);
    }
  });
};
