const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  pid: Number,
  name: String,
  price: Number,
  image: String,
  quantity: Number,
});
module.exports = mongoose.model("foodcart", CartSchema);
