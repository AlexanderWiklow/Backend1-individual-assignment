// Description: This file contains the postFriend function which is used to add a new friend to the database.

const { pool } = require("../../../config");

exports.postFriend = (req, res) => {
  const userId = req.loggedInUser.id;
  const friendUsername = req.body.friendUsername;

  // First, find the friend's user ID
  pool.query(
    "SELECT id FROM user WHERE username = ?",
    [friendUsername],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error adding friend" });
      }

      if (results.length === 0) {
        // json() is a method that sends a JSON response to the client with the status code 404 Not Found and a message that says "Friend not found"
        return res.status(404).json({ message: "Friend not found" });
      }

      const friendId = results[0].id;

      // Then, insert a new row into the friend table
      pool.query(
        "INSERT INTO friend (user_id, friend_id) VALUES (?, ?)",
        [userId, friendId],
        (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error adding friend" });
          }

          res.status(200).json({ message: "Friend added successfully" });
        }
      );
    }
  );
};
