const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users");
const validateUser = require("../config/middleware/validateUser");
const passport = require("passport");

router.get("/", usersControllers.getHome);
router.get("/register", usersControllers.getRegisterForm);
router.post("/register", validateUser, usersControllers.registerUser);
router.get("/login", usersControllers.getLoginForm);
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  usersControllers.login
);
router.get("/logout", usersControllers.logout);

module.exports = router;
