const mongoose = require("mongoose");

const trainingScheme = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Training = mongoose.model("Training", trainingScheme);

module.exports = Training;
