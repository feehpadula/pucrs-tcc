const express = require("express");
const router = express.Router();
const data = require("../services/reports");

router.post("/", async function (req, res, next) {
  try {
    res.json(await data.addReport(req.body));
  } catch (err) {
    console.error(`Error while adding data `, err.message);
    next(err);
  }
});

module.exports = router;
