const User = require("../Models/UserModel");

const user_create = (req, res) => {
  res.render("sign-up", { title: "Create A User" });
};

const user_login = (req, res) => {
  res.render("log-in", { title: "Login User" });
};

const user_create_post = (req, res) => {
  console.log(req.body);
  console.log("User Create here");
};
const user_login_post = (req, res) => {
  console.log(req.body);
  console.log("User Login here");
};

module.exports = {
  user_create,
  user_create_post,
  user_login,
  user_login_post,
};
