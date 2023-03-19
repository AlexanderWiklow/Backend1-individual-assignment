// Description: Get all friends of a user

const { pool } = require("../../../config");

exports.getFriend = (req, res) => {
  const userId = req.loggedInUser.id;

  pool.query(
    "SELECT username, id FROM user WHERE id IN (SELECT friend_id FROM friend WHERE user_id = ?)",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error getting friends" });
      }

      res.status(200).json(results);
    }
  );
};
