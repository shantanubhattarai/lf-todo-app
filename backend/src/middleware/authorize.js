module.exports = function (req, res, next) {
  if (req.user.role === "admin") {
    return next();
  } else {
    next({
      message: "you do not have access",
      status: 401,
    });
  }
};
