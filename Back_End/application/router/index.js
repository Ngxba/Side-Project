var express = require("express");
var router = express.Router();

var authRouter = require("./auth");
var questRouter = require("./question")
router.use("/auth", authRouter);
router.use("/question", questRouter)

module.exports = router;