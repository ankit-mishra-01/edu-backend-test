const mongoose = require("mongoose");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    course: String,
    data: Object,
  })
);

module.exports = Course;
