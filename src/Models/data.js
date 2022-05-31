const mongoonse = require("mongoose");

const dataScheme = mongoonse.Schema({
  weigth: {
    type: Number,
    required: true,
  },
  heigth: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  user: {
    type: mongoonse.Schema.Types.ObjectId,
    unique: true,
    required: true,
  },
});

dataScheme.methods.toJSON = function () {
  const dataObj = this.toObject();
  delete dataObj._id;
  delete dataObj.__v;
  delete dataObj.user;

  return dataObj;
};

const Data = mongoonse.model("Data", dataScheme);

module.exports = Data;
