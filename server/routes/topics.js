const express = require("express");
const router = express.Router();
const topics = require("../services/topics");

router.get("/", async function (req, res, next) {
  try {
    res.json(await topics.getTopics());
  } catch (err) {
    console.error(`Error while getting topics `, err.message);
    next(err);
  }
});

router.get("/:topicId/:page", async function (req, res, next) {
  try {
    res.json(await topics.getPageItems(req.params.topicId, req.params.page));
  } catch (err) {
    console.error(`Error while getting items `, err.message);
    next(err);
  }
});

router.get("/:topicId/:itemsId/r", async function (req, res, next) {
  try {
    res.json(await topics.getRandomItems(req.params.topicId, req.params.itemsId));
  } catch (err) {
    console.error(`Error while getting random items `, err.message);
    next(err);
  }
});

router.get("/:topicId", async function (req, res, next) {
  try {
    res.json(await topics.getItems(req.params.topicId));
  } catch (err) {
    console.error(`Error while getting items `, err.message);
    next(err);
  }
});

module.exports = router;
