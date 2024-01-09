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

async function deleteData(deleteData) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `DELETE FROM data
    WHERE id IN (${deleteData.deleteId.join(", ")});`
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

async function getFullData(itemsId) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT id, field01data, field02data, (field02data * 100) / field01data AS combined, date
    FROM data
    WHERE itemsId=${itemsId}
    ORDER BY id DESC;`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

async function getFences(itemsId) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(`CALL getFences(${itemsId})`);
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
  deleteData,
  getData,
  getFullData,
  getFences,
  getCountData,
};
