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

server.use(express.json());
server.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
server.use(cookieParser());

server.use("/authentication", authenticationRoute);
server.use("/friends", checkAuthentication, friendRoute);
server.use("/", checkAuthentication, listRoute);
server.use("/", checkAuthentication, itemRoute);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
