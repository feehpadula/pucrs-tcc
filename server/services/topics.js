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
      items.id,
      items.name,
      COUNT(data.id) AS contributions,
      MAX(DATE_FORMAT(data.date, '%d/%m/%Y')) AS lastUpdate
    FROM items
    LEFT JOIN data ON items.id = data.itemsId
    WHERE topicId = ${topicId} AND items.id <> ${itemsId}
    GROUP BY items.id, items.name
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
      items.id,
      items.name,
      COUNT(data.id) AS contributions,
      MAX(DATE_FORMAT(data.date, '%d/%m/%Y')) AS lastUpdate
    FROM items
    LEFT JOIN data ON items.id = data.itemsId
    WHERE topicId = ${topicId}
    GROUP BY items.id, items.name
    LIMIT 10`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

async function getPageItems(topicId, page) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT
      items.id,
      items.name,
      COUNT(data.id) AS contributions,
      MAX(data.date) AS lastUpdate
    FROM items
    LEFT JOIN data ON items.id = data.itemsId
    WHERE topicId = ${topicId}
    GROUP BY items.id, items.name
    ORDER BY lastUpdate DESC
    LIMIT ${page * 10}, 11`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

module.exports = {
  getTopics,
  getRandomItems,
  getItems,
  getPageItems,
};
