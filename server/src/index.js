const express = require("express");
const server = express();
const cors = require("cors");
const { authenticationRoute } = require("./routes/authenticationRoute");
const cookieParser = require("cookie-parser");
const { checkAuthentication } = require("./middlewares/checkAuthentication");
const { port } = require("../config");
const listRoute = require("./routes/listRoute");
const itemRoute = require("./routes/itemRoute");
const friendRoute = require("./routes/friendRoute");

// Use the express.json() middleware to parse the body of the request to JSON
server.use(express.json());

// Use the cors middleware to allow the client to access the server
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Use the cookieParser middleware to parse the cookies from the request
server.use(cookieParser());

// Use the authenticationRoute for all routes that start with /authentication (e.g. /authentication/login or /authentication/register)
server.use("/authentication", authenticationRoute);

// checkAuthentication is a middleware that checks if the user is logged in or not with the help of the authToken cookie. If the user is not logged in, the user will not be able to access the routes below.
server.use("/friends", checkAuthentication, friendRoute);
server.use("/", checkAuthentication, listRoute);
server.use("/", checkAuthentication, itemRoute);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
