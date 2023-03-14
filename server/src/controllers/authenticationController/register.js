const { users } = require("../../../database");
const { pool } = require("../../../config");
const {
  validateUsernamePassword,
} = require("../validations/validateUsernamePassword");
const hashPassword = require("../../middlewares/passwordHash");

exports.register = async (req, res) => {
  const validatedUser = validateUsernamePassword(req.body);

  if (validatedUser.error) {
    res.status(400).send(validatedUser.error.details[0].message);
    return;
  }

  const { username, password } = validatedUser.value;

  console.log("username", username);

  //   const dbUser = users.find((currentUser) => {
  //     return currentUser.username === username;
  //   });

  //   if (dbUser) {
  //     res.status(404).send(`Username: ${username} already exists!`);
  //     return;
  //   }

  //   // Hash the password
  //   const hashedPassword = await hashPassword(password);

  //   users.push({ username, hashedPassword });
  //   res.status(201).send(`User ${username} has been registered!`);

  // DONT CHANGE THIS CODE ABOVE

  // DONT CHANGE THIS CODE ABOVE

  //   // Connect to the MySQL database
  //   const pool = mysql.createPool({
  //     host: "localhost",
  //     user: "root",
  //     password: "123456qwerty",
  //     database: "Databasteknik",
  //   });

  //   // Skapar en SQL query med username och password.
  //   const sql = `
  //     INSERT INTO users(username, password)
  //     VALUES(?, ?)`;

  //   // Skapar en query
  //   pool.execute(sql, [username, password], (error, result) => {
  //     if (error) {
  //       console.log(error);
  //       res.sendStatus(500);
  //     } else {
  //       console.log(result);
  //       // res.json(result);
  //       res.send("User created!");
  //     }

  //     console.log(sql);
  //   });

  // Connect to the MySQL database
  //   const pool = mysql.createPool({
  //     host: "localhost",
  //     user: "root",
  //     password: "123456qwerty",
  //     database: "Databasteknik",
  //   });

  // Skapar en SQL query med username och password.
  //   const sql = `
  //     INSERT INTO users(username, password)
  //     VALUES(?, ?)`;

  //   // Skapar en query
  //   pool.execute(sql, [username, password], (error, result) => {
  //     if (error) {
  //       console.log(error);
  //       res.sendStatus(500);
  //     } else {
  //       //   console.log(result);
  //       // res.json(result);
  //       res.send("User created!");
  //     }

  //     // console.log(sql);
  //   });

  // DONT CHANGE THIS CODE ABOVE

  const sqlCheckUser = `
  SELECT COUNT(*) AS count
  FROM user
  WHERE username = ?
`;

  const sqlInsertUser = `
  INSERT INTO user(username, password)
  VALUES (?, ?)
`;

  // Check if the user already exists
  pool.execute(sqlCheckUser, [username], async (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }

    const count = results[0].count;

    if (count > 0) {
      res.status(409).send(`Username: ${username} already exists!`);
      return;
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Insert the user into the database
    pool.execute(sqlInsertUser, [username, hashedPassword], (error, result) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        console.log("User created!");
        res.send("User created!");
      }
    });
  });
};
