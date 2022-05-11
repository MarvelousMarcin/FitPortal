const auth = function (req, res, next) {
  if (req.session.authenticated) {
    req.user = req.session.user;
    return next();
  }

  res.status(400).send({ error: "No authorization" });
};

const loginRedir = function (req, res, next) {
  if (req.session.authenticated) {
    return res.redirect("/mainpage");
  }

  next();
};

module.exports = { auth, loginRedir };
