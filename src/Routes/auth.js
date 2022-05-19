const User = require("../Models/user");

const auth = function (req, res, next) {
  if (req.session.authenticated) {
    req.user = req.session.user;
    return res.redirect("/mainpage");
  }

  next();
};

const reDirToMain = async function (req, res, next) {
  if (req.session.authenticated) {
    req.user = await User.findOne({ login: req.session.user.login });
    return next();
  }

  res.redirect("/");
};

const loginRedir = function (req, res, next) {
  if (req.session.authenticated) {
    req.user = req.session.user;
    return res.redirect("/mainpage");
  }

  res.redirect("/");
};

module.exports = { auth, loginRedir, reDirToMain };
