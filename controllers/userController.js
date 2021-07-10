const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: maxAge });
};

const user_create = (req, res) => {
  res.render("sign-up", { title: "Create A User" });
};

const user_login = (req, res) => {
  res.render("log-in", { title: "Login User" });
};

const user_create_post = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("BlogCookie", token, { httpOnly: true, maxAge: maxAge });
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.log(err);
  }
};
const user_login_post = (req, res) => {
  console.log(req.body);
  console.log("User Login here");
};

const user_log_out = (req, res) => {
  res.cookie("BlogCookie", "", { httpOnly: true, maxAge: 1 });
};

module.exports = {
  user_create,
  user_create_post,
  user_login,
  user_login_post,
  user_log_out,
};
