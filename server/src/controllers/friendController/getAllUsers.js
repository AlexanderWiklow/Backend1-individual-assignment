// Description: Get all users except the logged in user
const { pool } = require("../../../config");

exports.getAllUsers = async (req, res) => {
  const userId = req.loggedInUser.id;

  const sqlQuery = `SELECT * FROM user WHERE id != ?`;

  pool.execute(sqlQuery, [userId], (err, results) => {
    if (err) {
      console.error(err);
      // json() is a method that sends a JSON response to the client with the status code 500 Internal Server Error and a message that says "Error getting users"
      return res.status(500).json({ message: "Error getting users" });
    }

    res.status(200).json(results);
  });
};
