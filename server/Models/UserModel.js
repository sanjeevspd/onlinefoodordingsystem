// const mongoose = require("mongoose");
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   firstname: String,
//   lastname: String,
//   address: String,
//   phoneno: Number,
// });
// const UserModel = mongoose.model("use", UserSchema);
// module.exports = UserModel;
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  address: String,
  phoneNumber: Number,
});
const UserModel = mongoose.model("use", UserSchema);
module.exports = UserModel;