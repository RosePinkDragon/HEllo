const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
  next();
});

userSchema.post("save", function (doc, next) {
  console.log("User is saved successfully");
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
