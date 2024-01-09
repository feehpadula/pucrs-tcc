const express = require("express");
const router = express.Router();
const data = require("../services/reports");
const helper = require("../helper");

router.post("/", async function (req, res, next) {
  try {
    const rights = helper.validateToken(
      req.headers["authorization"].replace(/^Bearer\s+/, "")
    );

    if (rights !== false) {
      res.json(await data.addReport(req.body));
    }
  } catch (err) {
    console.error(`Error while adding data `, err.message);
    next(err);
  }
});

module.exports = router;
