const mongoose = require("mongoose");

const ContactForm = mongoose.model(
  "ContactForm",
  new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    course: String,
    src: String
  })
);

module.exports = ContactForm;
