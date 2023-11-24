const express = require("express");
const router = express.Router();
const items = require("../services/items");

router.get("/", async function (req, res, next) {
  console.error(`Route not set`);
});

router.get("/latest", async function (req, res, next) {
  try {
    res.json(await items.getLatestItems(req.query.page));
  } catch (err) {
    console.error(`Error while getting latest items `, err.message);
    next(err);
  }
});

router.get("/:itemId", async function (req, res, next) {
  try {
    res.json(await items.getItem(req.params.itemId, req.query.page));
  } catch (err) {
    console.error(`Error while getting item `, err.message);
    next(err);
  }
});

module.exports = router;
