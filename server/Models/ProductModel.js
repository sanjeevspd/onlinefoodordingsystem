const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  pid: Number,
  name: String,
  price: Number,
  image: String,
  coins: Number,
  quantity: Number,
});
module.exports = mongoose.model("products", productSchema); // Use "foodproducts" as the model name
