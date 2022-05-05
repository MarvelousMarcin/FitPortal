const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "../public");

const app = express();
app.use(express.static(publicDirPath));
app.set("view engine", "html");
app.set("views", publicDirPath);

app.engine("html", require("hbs").__express);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
