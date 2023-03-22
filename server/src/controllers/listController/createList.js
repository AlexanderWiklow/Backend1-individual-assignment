// Description: Create a new list for the authenticated user

const {
  validateCreateList,
} = require("../validations/Lists/validateCreateList");
const { pool } = require("../../../config");

exports.createList = async (req, res) => {
  const { name } = req.body;
  const userId = req.loggedInUser.id;

  const { error } = validateCreateList(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const query = `INSERT INTO list (name, user_id) VALUES (?, ?)`;

  pool.execute(query, [name, userId], async (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error creating list");
    } else {
      res.status(200).json(result);
    }
  });
};
