const pool = require("./db");
const helper = require("../helper");
const config = require("../config");

async function addReport(report) {
  const connection = await pool.getConnection();
  const [rows, fields] = await connection.query(
    `INSERT INTO reports
      (
        itemsId, 
        reportType
      ) 
      VALUES 
      (
        ${report.itemsId},
        ${report.reportType}
      )`
  );
  connection.release();

  const data = helper.emptyOrRows(rows);

  return data;
}
module.exports = {
  addReport,
};
