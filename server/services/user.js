const jwt = require("jsonwebtoken");
const pool = require("./db");
const helper = require("../helper");
const config = require("../config");

async function addUser(user) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT username
    FROM users
    WHERE username = ${helper.setString(user.username)}
    LIMIT 1`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  if (data.length) {
    return { status: 409, message: "Usuário já existe" };
  } else {
    const recoveryCode = helper.generateRecoveryCode();
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(
      `INSERT INTO users 
        (
          username, 
          password,
          recoveryCode
        ) 
        VALUES 
        (
          ${helper.setString(user.username)}, 
          ${helper.setString(helper.hashPassword(user.password))},
          ${helper.setString(helper.hashPassword(recoveryCode))}
        )`
    );
    connection.release();

    const data = helper.emptyOrRows(rows);

    return { status: 200, message: "Usuário criado", recoveryCode: recoveryCode };
  }
}

async function postUser(user) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT id, username, password
    FROM users
    WHERE username = ${helper.setString(user.username)}
    LIMIT 1`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  if (data.length) {
    if (helper.hashCheck(user.password, data[0].password)) {
      const id = data[0].id;
      const username = user.username;
      const token = jwt.sign({ id, username }, process.env.JWT_TOKEN, {
        expiresIn: "3h",
      });
      return { token: token };
    }
  }

  return [];
}

async function postRecover(user) {
  console.log(user);
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT username, recoveryCode
    FROM users
    WHERE 
      username = ${helper.setString(user.username)}
    LIMIT 1`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  if (data.length) {
    if (helper.hashCheck(user.recoveryCode, data[0].recoveryCode)) {
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.query(
        `UPDATE users 
        SET password = ${helper.setString(helper.hashPassword(user.password))}
        WHERE username = ${helper.setString(user.username)}`
      );
      connection.release();

      const data = helper.emptyOrRows(rows);

      return { status: 200, message: "Senha atualizada" };
    }
  }

  return { status: 409, message: "Usuário ou código de recuperação inválidos" };
}

module.exports = {
  addUser,
  postUser,
  postRecover,
};
