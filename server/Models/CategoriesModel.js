const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  pid: Number,
  name: String,
  image:String
});
module.exports = mongoose.model("categories", productSchema); // Use "foodproducts" as the model name
