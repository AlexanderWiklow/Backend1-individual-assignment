// Description: This file contains the updateItem function which updates an item in the database.
const {
  validateUpdateItem,
} = require("../validations/Items/validateUpdateItem");
const { validateParams } = require("../validations/Items/validateParams");

const { pool } = require("../../../config");

exports.updateItem = async (req, res) => {
  const listId = parseInt(req.params.listId, 10);
  const itemId = parseInt(req.params.itemId, 10);

  const { description } = req.body;

  const { error } = validateUpdateItem(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // validate params: listId and itemId
  const { error: paramsError } = validateParams(req.params);

  if (paramsError) {
    return res.status(400).json({ message: paramsError.details[0].message });
  }

  const query = `UPDATE list_item SET description = ?  WHERE id = ? AND list_id = ?`;

  pool.execute(query, [description, itemId, listId], async (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error updating item");
    } else {
      res.status(200).json(result);
    }
  });
};
