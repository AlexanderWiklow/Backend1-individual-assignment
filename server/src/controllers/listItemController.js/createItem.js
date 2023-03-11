const { pool } = require("../../../config");
// Create a new todo for the logged in user
exports.createTodo = async (req, res) => {
  //   const { username } = req.loggedInUser;
  //   console.log(username);
  const { title, description, completed, user_id } = req.body;

  console.log();
  // create a new todo object
  //   const newTodo = {
  //     title: "New Todo",
  //     description: "This is a new todo",
  //     completed: false,
  //     user_id: 1, // replace with the actual user id
  //   };

  // insert the new todo into the database
  const query = `INSERT INTO todo (title, description, completed, user_id) VALUES (?,?,?,?)`;
  //   const values = [
  //     newTodo.title,
  //     newTodo.description,
  //     newTodo.completed,
  //     newTodo.user_id,
  //   ];

  pool.execute(
    query,
    [title, description, completed, user_id],
    async (error, result) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.send("Todo created!");
      }
    }
  );
};
