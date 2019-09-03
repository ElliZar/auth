const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserShema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: Date.now,
  },
  Admin: Boolean,
  Manager: Boolean,
});

module.exports = mongoose.model("User", UserShema);
