require("dotenv").config();

module.exports = {
  name: process.env.APP_NAME,
  version: process.env.APP_VERSION,
  port: process.env.APP_PORT || 9090,
  host: process.env.APP_HOST || "localhost",
  jwtSecret: process.env.JWT_SECRET,
  dbname: process.env.DB_NAME,
  dbuser: process.env.DB_USER,
  dbport: process.env.DB_PORT,
};
