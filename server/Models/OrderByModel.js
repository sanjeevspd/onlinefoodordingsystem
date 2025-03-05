const mongoose = require("mongoose");
const orderby = new mongoose.Schema({
  rid: Number,
  name: String,
  ownername: String,
  image: String,
  email: String,
  password: String,
  link: String,
});
module.exports = mongoose.model("orderbyy", orderby);
