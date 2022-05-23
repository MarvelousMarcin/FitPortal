const express = require("express");
const { reDirToMain } = require("../Routes/auth");
const Activities = require("../Models/activities");

const ActivitiesRoute = express.Router();

ActivitiesRoute.post("/activities", reDirToMain, async (req, res) => {
  const dayNumber = req.body.day;
  const typeOfActiv = req.body.type;
  const userId = req.user._id;

  if (!dayNumber) {
    return res.status(403).send();
  }

  const record = await Activities.findOne({
    user: userId,
    typeOfActivitie: typeOfActiv,
  });

  if (!record) {
    const newActiv = new Activities({
      user: userId,
      typeOfActivitie: typeOfActiv,
      daysDone: [dayNumber],
    });

    await newActiv.save();
    return res.send();
  }

  const newDaysDone = record.daysDone;
  if (newDaysDone.includes(dayNumber)) {
    for (let i = 0; i < newDaysDone.length; i++) {
      if (newDaysDone[i] === dayNumber) newDaysDone.splice(i, 1);
    }
  } else {
    newDaysDone.push(dayNumber);
  }
  record.update({ daysDone: newDaysDone });
  await record.save();
  res.send();
});

ActivitiesRoute.post("/activitieslist", reDirToMain, async (req, res) => {
  const userId = req.user._id;
  const typeOfActiv = req.body.type;

  const daysList = await Activities.findOne({
    user: userId,
    typeOfActivitie: typeOfActiv,
  });

  if (!daysList) {
    return res.send([]);
  }

  res.send(daysList.daysDone);
});

module.exports = ActivitiesRoute;
