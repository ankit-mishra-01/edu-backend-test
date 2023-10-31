const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.course = require("./course.model");
db.user = require("./user.model");
db.role = require("./role.model");
db.bookForm = require("./bookForm.model");
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;