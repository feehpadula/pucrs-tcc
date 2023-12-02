const express = require("express");
const router = express.Router();
const items = require("../services/items");

router.get("/", async function (req, res, next) {
  console.error(`Route not set`);
});

router.post("/", async function (req, res, next) {
  try {
    res.json(await items.addItem(req.body));
  } catch (err) {
    console.error(`Error while adding item `, err.message);
    next(err);
  }
});

router.get("/latest", async function (req, res, next) {
  try {
    res.json(await items.getLatestItems());
  } catch (err) {
    console.error(`Error while getting latest items `, err.message);
    next(err);
  }
});

router.get("/trending", async function (req, res, next) {
  try {
    res.json(await items.getTrendingItems());
  } catch (err) {
    console.error(`Error while getting trending items `, err.message);
    next(err);
  }
});

router.get("/search/:name", async function (req, res, next) {
  try {
    res.json(await items.getSearchItems(req.params.name));
  } catch (err) {
    console.error(`Error while searching items `, err.message);
    next(err);
  }
});

router.get("/search/:query/:page", async function (req, res, next) {
  try {
    res.json(await items.getSearchItems(req.params.query, req.params.page));
  } catch (err) {
    console.error(`Error while searching items `, err.message);
    next(err);
  }
});

router.get("/:itemId", async function (req, res, next) {
  try {
    res.json(await items.getItem(req.params.itemId));
  } catch (err) {
    console.error(`Error while getting item `, err.message);
    next(err);
  }
});

module.exports = router;
