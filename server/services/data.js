const pool = require("./db");
const helper = require("../helper");
const config = require("../config");

async function addData(newData) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `INSERT INTO data 
      (
        itemsId, 
        field01data, 
        field02data
      ) 
      VALUES 
      (
        ${newData.itemsId},
        ${newData.field01name}, 
        ${newData.field02name}
      )`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

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
  addData,
  getData,
  getCountData,
};
