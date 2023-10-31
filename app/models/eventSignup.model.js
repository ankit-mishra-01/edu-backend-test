const mongoose = require("mongoose");

const EventSignup = mongoose.model(
  "EventSignup",
  new mongoose.Schema({
    username: String,
    email: String,
    name:String,
    mobile:String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = EventSignup;
