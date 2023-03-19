// Description: Get all lists from the database

const { pool } = require("../../../config");

exports.getFriendList = (req, res) => {
  const userId = req.loggedInUser.id;

  pool.query("SELECT * FROM list", [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error getting lists" });
    }

    res.status(200).json(results);
  });
};
