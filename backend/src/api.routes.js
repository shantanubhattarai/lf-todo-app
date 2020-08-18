const authRoute = require("./controllers/auth.controller");
const todoRoute = require("./controllers/todo.controller");

// load middlewares
const authenticate = require("./middleware/authenticate");
const authorize = require("./middleware/authorize");

const router = require("express").Router();

router.use("/auth", authRoute);
router.use("/todo", authenticate, todoRoute);
module.exports = router;
