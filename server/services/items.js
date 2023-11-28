const pool = require("./db");
const helper = require("../helper");
const config = require("../config");

async function addItem(item) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `INSERT INTO items 
      (
        topicId, 
        name, 
        field01name, 
        field02name, 
        dataRelation, 
        dataPresentation, 
        dataOutliers) 
      VALUES 
      (
        ${item.topicId}, 
        ${helper.setString(item.name)}, 
        ${helper.setString(item.field01name)}, 
        ${helper.setString(item.field02name)}, 
        ${item.dataRelation}, 
        ${item.dataPresentation}, 
        ${item.dataOutliers}
      )`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

async function getItem(itemId) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT 
      id,
      topicId,
      name,
      field01name,
      field02name,
      dataRelation, 
      dataPresentation, 
      dataOutliers,
      (SELECT COUNT(*) FROM data WHERE data.itemsId = items.id) AS contributions
    FROM items
    WHERE items.id=${itemId}`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

async function getLatestItems() {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT 
      id, 
      topicId,
      name,
      creationDate
    FROM items
    ORDER BY creationDate DESC
    LIMIT 10`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

module.exports = {
  addItem,
  getItem,
  getLatestItems,
};
