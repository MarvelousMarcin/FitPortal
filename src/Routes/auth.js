const auth = function (req, res, next) {
  if (req.session.authenticated) {
    req.user = req.session.user;
    return res.redirect("/mainpage");
  }

  next();
};

const reDirToMain = function (req, res, next) {
  if (req.session.authenticated) {
    req.user = req.session.user;
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
