const pool = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getTopics() {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT id, name
    FROM topics`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

async function getRandomItems(topicId, itemsId) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT
      id,
      name,
      (SELECT COUNT(*) FROM data WHERE data.itemsId = items.id) AS contributions,
      (SELECT date FROM data WHERE data.itemsId = items.id ORDER BY date DESC LIMIT 1) AS lastUpdate
    FROM items
    WHERE topicId = ${topicId} AND items.id <> ${itemsId}
    ORDER BY RAND()
    LIMIT 5`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

async function getItems(topicId) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT
      id,
      name,
      (SELECT COUNT(*) FROM data WHERE data.itemsId = items.id) AS contributions,
      (SELECT date FROM data WHERE data.itemsId = items.id ORDER BY date DESC LIMIT 1) AS lastUpdate
    FROM items
    WHERE topicId = ${topicId}`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

module.exports = {
  getTopics,
  getRandomItems,
  getItems,
};
