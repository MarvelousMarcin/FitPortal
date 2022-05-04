const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "../public");

const app = express();
app.use(express.static(publicDirPath));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
