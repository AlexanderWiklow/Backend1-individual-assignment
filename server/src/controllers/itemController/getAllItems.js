// Description: Get all items for the specified list

const { pool } = require("../../../config");

exports.getAllItems = async (req, res) => {
  // Validate if user enters body or query in the request.
  const query = req.query;
  const body = req.body;

  const queryKeys = Object.keys(query);
  const bodyKeys = Object.keys(body);

  if (queryKeys.length > 0 || bodyKeys.length > 0) {
    res.status(406).send("Please do not send in data");
    alert("Please do not send in data");
    return;
  }

  const listId = parseInt(req.params.listId, 10);

  const sqlQuery = `SELECT * FROM list_item WHERE list_id = ?`;

  pool.execute(sqlQuery, [listId], async (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error getting items");
    }
    res.status(200).json(result);
  });
};
