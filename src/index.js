const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const port = process.env.PORT;
const publicDirPath = path.join(__dirname, "../public");

const UserRoute = require("./Routes/user");
const BmiRoute = require("./Routes/bmi");
const DataRoute = require("./Routes/data");
const FriendsRoute = require("./Routes/friends");
const ActivRoute = require("./Routes/activities");
const TrainingRoute = require("./Routes/training");

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { auth, reDirToMain } = require("./Routes/auth");
require("./mongoose");
const dbString = process.env.MONGODB_URL;

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
    secret: process.env.SESSION_KEY,
    resave: false,
    cookie: { maxAge: 3000000 },
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: dbString }),
  })
);
io.use(
  wrap(
    session({
      secret: process.env.SESSION_KEY,
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
app.use(ActivRoute);
app.use(TrainingRoute);

app.get("/login", auth, (req, res) => {
  res.render("login");
});

app.get("/bmi", reDirToMain, (req, res) => {
  res.render("bmi");
});

app.get("/data", reDirToMain, (req, res) => {
  res.render("data", { login: req.user.login });
});

app.get("/activities", reDirToMain, (req, res) => {
  res.render("activities");
});

app.get("/home", reDirToMain, (req, res) => {
  res.render("home");
});

app.get("/friends", reDirToMain, (req, res) => {
  res.render("friends");
});

app.get("/trainings", reDirToMain, (req, res) => {
  res.render("trainings");
});

app.get("/squats", reDirToMain, (req, res) => {
  res.render("squats");
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
