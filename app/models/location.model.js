const mongoose = require("mongoose");

const Location = mongoose.model(
  "Location",
  new mongoose.Schema({
    city: String,
    formattedAddress: String,
    country: String,
    countryCode: String,
    zipcode: String,
    lat: String,
    lon: String,
    path:String
  })
);

module.exports = Location;
