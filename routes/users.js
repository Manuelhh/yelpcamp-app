const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users");
const validateUser = require("../config/middleware/validateUser");

router.get("/", usersControllers.getHome);
router.get("/register", usersControllers.getRegisterForm);
router.post("/register", validateUser, usersControllers.registerUser);
router.get("/login", usersControllers.getLoginForm);

module.exports = router;
