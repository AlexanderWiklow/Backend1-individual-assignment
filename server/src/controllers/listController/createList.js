const { pool } = require("../../../config");

// Create a new list for the authenticated user
exports.createList = async (req, res) => {
  const { name } = req.body;
  const userId = 1;

  const query = `INSERT INTO list (name, user_id) VALUES (?, ?)`;

  pool.execute(query, [name, userId], async (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send("List created!");
    }
  });
};
