const User = require("../models/user");
const createError = require("http-errors");

const getHome = (req, res, next) => {
  res.redirect("/home");
};

const getRegisterForm = async (req, res, next) => {
  res.render("users/register");
};

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await new User({ username, email });
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.flash("success", "You have succesfully registered");
    res.redirect("/campgrounds");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/register");
  }
};

const getLoginForm = (req, res, next) => {
  res.render("users/login");
};

module.exports = {
  getHome,
  getRegisterForm,
  registerUser,
  getLoginForm,
};
