const express = require("express");
const bcrypt = require("bcrypt");
const userRoute = express.Router();
const User = require("../Models/user");
const { auth, loginRedir } = require("./auth");

const saltRounds = 10;

userRoute.get("/mainpage", auth, (req, res) => {
  res.render("mainPage", { name: req.user.login });
});

userRoute.post("/register", async (req, res) => {
  // Check if we got request body
  if (!req.body) {
    return res.status(400).send({ error: "Wrong data" });
  }

  let { login, password, email } = req.body;

  // Check if we got every required part
  if (!login || !password || !email) {
    return res.status(400).send({ error: "Wrong data" });
  }

  // Check if User with that login exists
  const findUser = await User.findOne({ login });
  if (findUser) {
    return res.status(400).send({ error: "This login is used" });
  }
  try {
    password = bcrypt.hashSync(password, saltRounds);
    const user = new User({ login, password, email });
    await user.save();
    res.send(req.body);
  } catch (error) {
    return res.status(400).send({ error: "Problem with registration" });
  }
});

userRoute.post("/login", loginRedir, async (req, res) => {
  // Check if we got request body
  if (!req.body) {
    return res.status(400).send({ error: "Wrong data" });
  }

  const { login, password } = req.body;

  // Check if we got every required part
  if (!login || !password) {
    return res.status(400).send({ error: "Wrong data" });
  }

  if (req.session.authenticated) {
    return res.send("auth");
  }

  const userWithLogin = await User.findOne({ login });

  if (!userWithLogin) {
    return res.status(400).send({ error: "Wrong data" });
  }

  const realPassword = userWithLogin.password;

  if (bcrypt.compareSync(password, realPassword)) {
    req.session.authenticated = true;
    req.session.user = {
      login,
      password,
    };
    res.send("ok");
  } else {
    res.send("wrong");
  }
});

module.exports = userRoute;
