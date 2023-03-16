const { pool } = require("../../../config");

exports.getAllUsers = async (req, res) => {
  const userId = req.loggedInUser.id;

  const query = `SELECT * FROM user WHERE id != ?`;

  pool.execute(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error getting users" });
    }

    res.status(200).json(results);
  });
};
