const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "../public");
const UserRoute = require("./Routes/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { auth } = require("./Routes/auth");
require("./mongoose");
const dbString = "mongodb://127.0.0.1:27017/FitPortal";
const app = express();
app.use(express.static(publicDirPath));
app.set("view engine", "html");
app.set("views", publicDirPath);
app.engine("html", require("hbs").__express);
app.use(express.json());
app.use(
  session({
    secret: "some secret",
    resave: false,
    cookie: { maxAge: 3000000 },
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: dbString }),
  })
);

app.use(UserRoute);

app.get("/login", auth, (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/news", (req, res) => {
  res.render("news");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
