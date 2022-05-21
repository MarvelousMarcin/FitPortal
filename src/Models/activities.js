const mongoose = require("mongoose");

const ActivitiesScheme = mongoose.Schema({
  typeOfActivitie: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  daysDone: {
    type: Array,
    default: [],
  },
});

const Activities = mongoose.model("Activities", ActivitiesScheme);

module.exports = Activities;
