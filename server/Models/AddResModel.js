const mongoose = require("mongoose");
const ResSchema = new mongoose.Schema({
  rid: Number,
  name: String,
  image: String,
  email: String,
  password: String,
});
module.exports = mongoose.model("rests", ResSchema);
