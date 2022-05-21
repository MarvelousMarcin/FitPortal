const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "../public");

const UserRoute = require("./Routes/user");
const BmiRoute = require("./Routes/bmi");
const DataRoute = require("./Routes/data");
const FriendsRoute = require("./Routes/friends");

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { auth, reDirToMain } = require("./Routes/auth");
require("./mongoose");
const dbString = "mongodb://127.0.0.1:27017/FitPortal";

const app = express();
const server = http.createServer(app);
const io = socketio(server);

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
io.use(
  wrap(
    session({
      secret: "some secret",
      resave: false,
      cookie: { maxAge: 3000000 },
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: dbString }),
    })
  )
);

app.use(UserRoute);
app.use(DataRoute);
app.use(BmiRoute);
app.use(FriendsRoute);

app.get("/login", auth, (req, res) => {
  res.render("login");
});

app.get("/bmi", reDirToMain, (req, res) => {
  res.render("bmi");
});

app.get("/data", reDirToMain, (req, res) => {
  res.render("data", { login: req.user.login });
});

app.get("/activites", reDirToMain, (req, res) => {
  res.render("activities");
});

app.get("/friends", reDirToMain, (req, res) => {
  res.render("friends");
});

app.get("/pushups", reDirToMain, (req, res) => {
  res.render("pushups");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/news", (req, res) => {
  res.render("news");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = io;
