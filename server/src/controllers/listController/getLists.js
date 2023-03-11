const { pool } = require("../../../config");

exports.getList = (req, res) => {
  const userId = req.loggedInUser.id;
  //   const listId = parseInt(req.params.listId, 10);

  pool.query(
    "SELECT * FROM list WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error getting lists" });
      }
      res.status(200).json(results);
    }
  );
};
