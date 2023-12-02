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
      COUNT(data.id) AS contributions
    FROM items
    LEFT JOIN data ON items.id = data.itemsId
    WHERE items.id = ${itemId}
    GROUP BY items.id, topicId, name, field01name, field02name, dataRelation, dataPresentation, dataOutliers`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

async function getLatestItems() {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT 
      items.id, 
      items.topicId,
      items.name,
      items.creationDate,
      COUNT(data.id) AS totalContributions,
      MAX(DATE_FORMAT(data.date, '%d/%m/%Y')) AS lastUpdate
    FROM items
    LEFT JOIN data ON items.id = data.itemsId
    GROUP BY items.id, items.topicId, items.name, items.creationDate
    ORDER BY items.creationDate DESC
    LIMIT 10`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

async function getTrendingItems() {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT 
      items.id,
      items.topicId,
      items.name, 
      COUNT(*) AS monthContributions,
      COUNT(data.id) AS totalContributions,
      MAX(DATE_FORMAT(data.date, '%d/%m/%Y')) AS lastUpdate
    FROM items
    INNER JOIN data ON items.id = data.itemsId
    WHERE data.date >= NOW() - INTERVAL 30 DAY
    GROUP BY items.id, items.topicId, items.name
    ORDER BY monthContributions DESC
    LIMIT 10`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

async function getSearchItems(query, page) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `SELECT 
      items.id, 
      items.topicId,
      items.name,
      items.creationDate,
      COUNT(data.id) AS contributions,
      MAX(data.date) AS lastUpdate
    FROM items
    LEFT JOIN data ON items.id = data.itemsId
    WHERE items.name LIKE '%${query}%'
    GROUP BY items.id, items.topicId, items.name, items.creationDate
    ORDER BY lastUpdate DESC
    LIMIT ${page * 10}, 11`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}

module.exports = {
  addItem,
  getItem,
  getLatestItems,
  getTrendingItems,
  getSearchItems,
};
