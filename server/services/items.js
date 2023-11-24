const pool = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getItem(itemId) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT 
      id,
      topicId,
      name,
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
  getItem,
  getLatestItems,
};
