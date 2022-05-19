const express = require("express");
const { reDirToMain } = require("../Routes/auth");
const dataRoute = express.Router();
const Data = require("../Models/data");

dataRoute.post("/data", reDirToMain, async (req, res) => {
  const userId = req.user._id;
  const dataBody = { ...req.body, user: userId };

  const data = await Data.findOne({ user: userId });

  if (!data) {
    const dataObj = new Data(dataBody);
    await dataObj.save();
    return res.send(dataObj);
  } else {
    await Data.findOneAndUpdate({ _id: data._id }, dataBody);
    res.send(dataBody);
  }
});

module.exports = dataRoute;
