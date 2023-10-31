const mongoose = require("mongoose");

const BookForm = mongoose.model(
  "BookForm",
  new mongoose.Schema({
    username: String,
    email: String,
    mobile: String,
    name: String,
    course: String,
    subject: String,
    specialRequirement: String,
    date: String,
    updated_at: {
      type: Date,
      default: Date.now
    },
    formattedDate: String,
    time: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = BookForm;
