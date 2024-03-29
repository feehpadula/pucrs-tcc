const express = require("express");
const router = express.Router();
const user = require("../services/user");
const helper = require("../helper");

router.post("/register", async function (req, res, next) {
  try {
    let response = await user.addUser(req.body);

    res.status(response.status).send({
      message: response.message,
      ...(response.recoveryCode && { recoveryCode: response.recoveryCode }),
    });
  } catch (err) {
    console.error(`Error while creating user `, err.message);
    next(err);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    res.json(await user.postUser(req.body));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});

router.post("/recover", async function (req, res, next) {
  try {
    let response = await user.postRecover(req.body);

    res.status(response.status).send({
      message: response.message,
    });
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});

router.post("/token", async function (req, res, next) {
  try {
    const rights = helper.validateToken(req.body.JWT_TOKEN);

    if (rights !== false) {
      return res.status(200).json({ message: "success", rights: rights });
    } else {
      return res.status(401).json({ message: "error" });
    }
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});

module.exports = router;
