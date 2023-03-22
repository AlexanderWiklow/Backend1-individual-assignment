// Description: Create a new item for the specified list

const {
  validateCreateItem,
} = require("../validations/Items/validateCreateItem");

const { pool } = require("../../../config");

exports.createItem = async (req, res) => {
  const { description, completed, list_id } = req.body;

  const { error } = validateCreateItem(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const query = `INSERT INTO list_item ( description, completed, list_id) VALUES (?, ?, ?)`;

  pool.execute(
    query,
    [description, completed, list_id],
    async (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error creating item");
      } else {
        res.status(200).json(result);
      }
    }
  );
};
