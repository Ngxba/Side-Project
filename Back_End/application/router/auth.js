var express = require("express");
var router = express.Router();
var authService = require("../../domain/service/authService");

router.post("/login", async (req, res) => {
  const {email, password } = req.body;
  try {
    const user = await authService.signIn(email, password);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json({
      account: err.message
    });
  }
});

router.post("/getuser", async (req,res) => {
  const {email, roll} = req.body;
  try {
    const user = await authService.findUser(email, roll)
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json({
      account: err.message
    });
  }
})

router.post("/register", async (req, res) => {
  const {
    email,
    password,
    name,
    address1,
    address2,
    city,
    state,
    zip,
    agree,
    roll
  } = req.body;
  try {
    const user = await authService.signUp(
      email,
      password,
      name,
      address1,
      address2,
      city,
      state,
      zip,
      agree,
      roll
    );
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json({
      email: err.message
    });
  }
});

router.post("/logout", (req, res) => {});

module.exports = router;
