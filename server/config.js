const mysql = require("mysql2");
require("dotenv").config();

// const config = {
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   host: process.env.DATABASE_HOST,
//   database: process.env.DATABASE_DATABASE,
// };

// THIS WORKS:

const config = {
  host: "localhost",
  user: "root",
  password: "123456qwerty",
  database: "TODODB",
};

const pool = mysql.createPool(config);

const port = 5050;

module.exports = { pool, port };
