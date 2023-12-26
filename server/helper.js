const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

function setString(string) {
  return string !== null ? `'${string}'` : null;
}

function generateToken(id, username) {
  return jwt.sign({ id, username }, process.env.JWT_TOKEN, {
    expiresIn: "3h",
  });
}

function validateToken(token) {
  return jwt.verify(token, process.env.JWT_TOKEN);
}

function hashPassword(string) {
  return bcrypt.hashSync(string, salt);
}

function hashCheck(userString, dbString) {
  return bcrypt.compareSync(userString, dbString);
}

function generateRecoveryCode() {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  for (var i = 16; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];

  return result.replace(/(.{4})/g, "$1-").slice(0, -1);
}

module.exports = {
  getOffset,
  emptyOrRows,
  setString,
  generateToken,
  validateToken,
  hashPassword,
  hashCheck,
  generateRecoveryCode,
};
