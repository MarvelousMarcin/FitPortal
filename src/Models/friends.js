const mongoose = require("mongoose");

const friendsScheme = mongoose.Schema({
  user1: {
    required: true,
    type: String,
  },
  user2: {
    required: true,
    type: String,
  },
});

const Friends = mongoose.model("Friends", friendsScheme);

module.exports = Friends;
