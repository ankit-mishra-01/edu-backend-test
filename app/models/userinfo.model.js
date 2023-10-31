const mongoose = require("mongoose");

const UserInfo = mongoose.model(
  "UserInfo",
  new mongoose.Schema({
    email: String,
    name:String,
    mobile:String,
    othercontact:String,
    isEnrolled: Boolean,
    welcomeEmail: Boolean,
    enquiryEmail: Boolean,
    demoEmail: Number,
    paymentType: String,
    enrolmentDate: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = UserInfo;
