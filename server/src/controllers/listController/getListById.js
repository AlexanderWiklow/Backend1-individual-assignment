// Description: Get list by id
const {
  validateGetListById,
} = require("../validations/Lists/validateGetListById");

const { pool } = require("../../../config");

exports.getListById = (req, res) => {
  const userId = req.loggedInUser.id;
  const listId = parseInt(req.params.listId, 10);

  const { error } = validateGetListById(req.params);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  pool.query(
    "SELECT * FROM list WHERE id = ? AND user_id = ?",
    [listId, userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error getting lists" });
      }
      res.status(200).json(results);
    }
  );
};
