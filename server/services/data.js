const pool = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getData(itemsId) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(`CALL getData(${itemsId})`);
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

async function getCountData(itemsId) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT COUNT(*) as count
    FROM data
    WHERE itemsId=${itemsId}`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

module.exports = {
  getData,
  getCountData,
};
