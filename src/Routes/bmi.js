const express = require("express");
const { reDirToMain } = require("../Routes/auth");
const Data = require("../Models/data");
const { getStatus, countBmi } = require("../Utils/bmi");

const bmiRoute = express.Router();

bmiRoute.get("/bmiValue", reDirToMain, async (req, res) => {
  const userData = await Data.findOne({ user: req.user._id });

  if (!userData) {
    return res.status(403).send({ status: "error" });
  }

  const mass = userData.weigth;
  const heig = userData.heigth;
  const bmi = Math.round(countBmi(heig / 100, mass) * 10) / 10;

  res.send({ bmi, ...getStatus(bmi) });
});

module.exports = bmiRoute;
