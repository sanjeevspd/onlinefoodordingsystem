const mongoose = require("mongoose");
const WhatSchema = new mongoose.Schema({
  image: String,
  name: String,
  link: String,
});
module.exports = mongoose.model("whatsonmind", WhatSchema);
