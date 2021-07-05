const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: [true, "Password Is required"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
