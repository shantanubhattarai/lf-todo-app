const router = require("express").Router();
const dbconn = require("./../dbconn");
const config = require("./../configs/config");

router
  .route("/")
  .get(function (req, res, next) {
    try {
      let sqlQuery = `SELECT * FROM todos WHERE userid=${req.user.id} AND isDeleted=0`;
      dbconn.connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    } catch {
      next(err);
    }
  })
  .put(function (req, res, next) {
    try {
      let sqlQuery = `UPDATE todos SET content='${req.body.content}', isCompleted=${req.body.isCompleted} WHERE id=${req.body.id}`;

      dbconn.connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      next(err);
    }
  })
  .post(function (req, res, next) {
    try {
      let sqlQuery = `INSERT INTO todos(content, userId) VALUES('${req.body.content}', ${req.user.id})`;

      dbconn.connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      next(err);
    }
  })
  .delete(function (req, res, next) {
    try {
      let sqlQuery = `UPDATE todos SET isDeleted=1 WHERE id=${req.body.id}`;

      dbconn.connection.query(sqlQuery, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
