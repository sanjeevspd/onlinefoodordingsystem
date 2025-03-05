const mongoose=require('mongoose');
const PreOrderSchema = new mongoose.Schema({
    pid: Number,
    name: String,
    price: Number,
    image: String,
    quantity: Number,
    email:String
  });
  module.exports = mongoose.model("preorder", PreOrderSchema);