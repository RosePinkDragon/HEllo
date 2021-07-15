const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "That Email is already Taken";
  }

  if (err.message === "User Not Found") {
    errors.password = "User Not Found";
  }

  if (err.message === "Incorrect Details") {
    errors.password = "Incorrect Details";
  }

  if (err.message.includes("validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

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

const user_create_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("BlogCookie", token, { httpOnly: true, maxAge: maxAge });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const user_login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("BlogCookie", token, { httpOnly: true, maxAge: maxAge });
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const user_log_out = (req, res, next) => {
  res.cookie("BlogCookie", "", { httpOnly: true, maxAge: 1 });
  res.redirect("/log-in");
  next();
};

module.exports = {
  user_create,
  user_create_post,
  user_login,
  user_login_post,
  user_log_out,
};
