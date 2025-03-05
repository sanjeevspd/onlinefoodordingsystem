const mongoose = require("mongoose");
const DriverSchema = new mongoose.Schema({
  did: Number,
  name: String,
  phonenumber: Number,
  image: String,
  address:String,
  username:String,
  password:String,
});
module.exports = mongoose.model("driver",DriverSchema); // Use "foodproducts" as the model name
