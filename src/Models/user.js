const mongoose = require("mongoose");

const UserScheme = mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

UserScheme.methods.toJSON = function () {
  const userObj = this.toObject();
  delete userObj.password;
  delete userObj.__v;

  return userObj;
};

const User = mongoose.model("User", UserScheme);
module.exports = User;
