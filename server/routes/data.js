const express = require("express");
const router = express.Router();
const data = require("../services/data");
const helper = require("../helper");

router.post("/", async function (req, res, next) {
  try {
    const rights = helper.validateToken(
      req.headers["authorization"].replace(/^Bearer\s+/, "")
    );

    if (rights !== false) {
      res.json(await data.addData(req.body));
    }
  } catch (err) {
    console.error(`Error while adding data `, err.message);
    next(err);
  }
});

router.post("/delete", async function (req, res, next) {
  try {
    const rights = helper.validateToken(
      req.headers["authorization"].replace(/^Bearer\s+/, "")
    );

    if (rights !== false) {
      res.json(await data.deleteData(req.body));
    }
  } catch (err) {
    console.error(`Error while adding data `, err.message);
    next(err);
  }
});

router.get("/:itemsId", async function (req, res, next) {
  try {
    res.json(await data.getData(req.params.itemsId));
  } catch (err) {
    console.error(`Error while getting item `, err.message);
    next(err);
  }
});

router.get("/:itemsId/full", async function (req, res, next) {
  try {
    const rights = helper.validateToken(
      req.headers["authorization"].replace(/^Bearer\s+/, "")
    );

    if (rights !== false) {
      res.json(await data.getFullData(req.params.itemsId));
    }
  } catch (err) {
    console.error(`Error while getting item `, err.message);
    next(err);
  }
});

router.get("/:itemsId/fences", async function (req, res, next) {
  try {
    const rights = helper.validateToken(
      req.headers["authorization"].replace(/^Bearer\s+/, "")
    );

    if (rights !== false) {
      res.json(await data.getFences(req.params.itemsId));
    }
  } catch (err) {
    console.error(`Error while getting item `, err.message);
    next(err);
  }
});

router.get("/:itemsId/count", async function (req, res, next) {
  try {
    res.json(await data.getCountData(req.params.itemsId));
  } catch (err) {
    console.error(`Error while getting item `, err.message);
    next(err);
  }
});

module.exports = router;
