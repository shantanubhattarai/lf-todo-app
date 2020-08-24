const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("./../configs/config");
const router = express.Router();
const dbconn = require("./../dbconn");

function createToken(data) {
  return jwt.sign(JSON.stringify(data), config.jwtSecret);
}

router.post("/login", function (req, res, next) {
  if (!req.body.username || req.body.username.length < 0) {
    res.send({ status: 400, message: "Empty username" });
    return;
  }
  if (!req.password || req.password.length < 0) {
    res.send({ status: 400, message: "Empty password" });
    return;
  }
  let sqlQuery = `SELECT * FROM users WHERE username='${req.body.username}'`;
  dbconn.connection.query(sqlQuery, function (err, result) {
    if (err) next(err);
    if (result.length === 0) {
      res.send({ status: 400, message: "user not password" });
      return;
    }
    bcrypt.compare(req.body.password, result[0].password, function (
      err,
      comparisonResult
    ) {
      if (err) next(err);
      if (!comparisonResult) {
        res.send({ status: 400, message: "wrong password" });
        return;
      }
      let token = createToken(result[0]);
      req.headers["authToken"] = token;
      res.send({
        id: result[0].id,
        username: result[0].username,
        token,
        status: 200,
      });
    });
  });
});

router.post("/register", async (req, res, next) => {
  if (!req.body.username || req.body.username.length < 0) {
    res.send({ status: 400, message: "Empty username" });
    return;
  }
  if (!req.password || req.password.length < 0) {
    res.send({ status: 400, message: "Empty password" });
    return;
  }
  if (req.password.length < 8) {
    res.send({
      status: 400,
      message: "Password must be at least 8 characters",
    });
    return;
  }
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
    let sqlQuery = `INSERT INTO users(username, password) VALUES('${req.body.username}', '${passwordHash}')`;

    dbconn.connection.query(sqlQuery, function (err, result) {
      if (err) throw err;
      res.send({ status: 200 });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
