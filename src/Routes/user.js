const express = require("express");
const bcrypt = require("bcrypt");
const userRoute = express.Router();
const User = require("../Models/user");
const Data = require("../Models/data");
const UserJoi = require("../Validate/validateUser");
const { auth, loginRedir, reDirToMain } = require("./auth");

const saltRounds = 10;

userRoute.get("/mainpage", reDirToMain, (req, res) => {
  res.render("mainPage", { login: req.user.login });
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
    await UserJoi.validateAsync({ login, password, email });
    password = bcrypt.hashSync(password, saltRounds);
    const user = new User({ login, password, email });
    await user.save();
    res.send();
  } catch (error) {
    return res.status(400).send({ error });
  }
});

userRoute.post("/login", async (req, res) => {
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
    res.send();
  } else {
    res.status(403).send({ error: "Wrong data" });
  }
});

userRoute.get("/logout", reDirToMain, (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

userRoute.post("/getuserinfo", reDirToMain, async (req, res) => {
  const login = req.body.login;

  if (!login) {
    return res.status(400).send({ error: "Problem" });
  }

  const findUser = await User.findOne({ login });

  if (!findUser) {
    return res.status(400).send({ error: "Problem" });
  }

  const userId = findUser._id;

  const findData = await Data.findOne({ user: userId });

  if (!findData) {
    return res.status(400).send({ error: "No data filled" });
  }

  res.send(findData);
});

module.exports = userRoute;
