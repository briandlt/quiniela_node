require('dotenv').config();

module.exports = {
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPwd: process.env.DB_PWD,
  secretKey: process.env.SECRET_KEY
}
