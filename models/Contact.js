const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactShema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: "personal"
  },
  date: {
    type: Date,
    require: Date.now
  },
  Admin: Boolean,
  Manager: Boolean
});

module.exports = mongoose.model("Contact", ContactShema);