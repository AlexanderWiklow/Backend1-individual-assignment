// Description: Get all items for the specified list
const {
  validateGetAllItems,
} = require("../validations/Items/validateGetAllItems");

const { pool } = require("../../../config");

exports.getAllItems = async (req, res) => {
  const listId = parseInt(req.params.listId, 10);

  const { error } = validateGetAllItems(req.params);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const sqlQuery = `SELECT * FROM list_item WHERE list_id = ?`;

  pool.execute(sqlQuery, [listId], async (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error getting items");
    }
    res.status(200).json(result);
  });
};
