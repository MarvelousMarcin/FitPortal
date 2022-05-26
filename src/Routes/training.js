const express = require("express");

const TrainingRoute = express.Router();
const Training = require("../Models/training");
const { reDirToMain } = require("../Routes/auth");

TrainingRoute.post("/training", reDirToMain, async (req, res) => {
  if (!req.body) {
    return res.status(403).send({ error: "No body" });
  }

  const { name, duration, date } = req.body;

  if (name === null || duration === null || date === null) {
    return res.status(403).send({ error: "Empty values" });
  }

  const user = req.user._id;

  try {
    const training = new Training({ name, duration, date, user });
    await training.save();
    return res.send();
  } catch (error) {
    return res.status(403).send({ error });
  }
});

const getTimeString = (time) => {
  const trainingHour = Math.trunc(time / 60);
  const trainingMin = time - 60 * trainingHour;
  const dura = `${trainingHour}h ${trainingMin}min`;
  return dura;
};

const newTraining = (train) => {
  return {
    name: train.name,
    date: train.date.getTime(),
    dura: getTimeString(train.duration),
  };
};

TrainingRoute.get("/traininglist", reDirToMain, async (req, res) => {
  const userId = req.user._id;

  const trainings = await Training.find({ user: userId });
  const t = trainings.map((train) => newTraining(train));
  res.send(t);
});

module.exports = TrainingRoute;
