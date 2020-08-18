const express = require("express");
const bodyParser = require("body-parser");
const config = require("./configs/config");
const apiRoute = require("./api.routes");
const cors = require("cors");
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(cors());

server.use("/api", apiRoute);

server.use(function (req, res, next) {
  next({
    msg: "Not Found",
    status: 404,
  });
});

server.listen(config.port, config.host, () => {
  console.log("server running on port", config.port);
});
