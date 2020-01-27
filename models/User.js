const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  userType: {
    type: String,
    enum: ["parentUser", "kita", "admin"]
  }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
