const requireUser = (req, res, next) => {
  console.log("in the middle ware");
  next();
};

module.exports = requireUser;
