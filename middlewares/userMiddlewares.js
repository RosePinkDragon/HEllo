const { verify } = require("jsonwebtoken");
const User = require("../Models/UserModel");

const checkUser = async (req, res, next) => {
  const token = req.cookies.BlogCookie;
  if (token) {
    verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        if (!user) {
          res.locals.user = null;
          next();
        }
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const requireUser = async (req, res, next) => {
  const token = req.cookies.BlogCookie;
  if (token) {
    verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/log-in");
      } else {
        let user = await User.findById(decodedToken.id);
        if (!user) {
          res.redirect("/log-in");
        }
        next();
      }
    });
  } else {
    res.redirect("/log-in");
  }
};

module.exports = { checkUser, requireUser };
