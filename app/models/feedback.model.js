const mongoose = require("mongoose");

const Feedback = mongoose.model(
  "Feedback",
  new mongoose.Schema(
    {
      userdata: Object,
      postdemo: Object,
      mobile: String,
      updated_at: {
        type: Date,
        default: Date.now,
      },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
    },
    { timestamps: true }
  )
);

module.exports = Feedback;
