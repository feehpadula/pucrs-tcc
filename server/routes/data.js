const express = require("express");
const router = express.Router();
const data = require("../services/data");

router.get("/:itemsId", async function (req, res, next) {
  try {
    res.json(await data.getData(req.params.itemsId, req.query.page));
  } catch (err) {
    console.error(`Error while getting item `, err.message);
    next(err);
  }
});

router.get("/:itemsId/count", async function (req, res, next) {
  try {
    res.json(await data.getCountData(req.params.itemsId, req.query.page));
  } catch (err) {
    console.error(`Error while getting item `, err.message);
    next(err);
  }
});

module.exports = router;
