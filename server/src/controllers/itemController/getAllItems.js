// Description: Get all items for the specified list

const { pool } = require("../../../config");

exports.getAllItems = async (req, res) => {
  const listId = parseInt(req.params.listId, 10);

  const query = `SELECT * FROM list_item WHERE list_id = ?`;

  pool.execute(query, [listId], async (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error getting items");
    }
    res.status(200).json(result);
  });
};
