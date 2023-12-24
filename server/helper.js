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

function verifyJWT(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id;
    next();
  });
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
  verifyJWT,
  hashPassword,
  hashCheck,
  generateRecoveryCode,
};
