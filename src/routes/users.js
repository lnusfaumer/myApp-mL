const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
var userValidator = require("../middlewares/user-validator")

router.get("/", usersController.login);
router.post("/login", usersController.processLogin);

router.post("/logout", usersController.logout);

router.get("/register", usersController.register);
router.post("/register", userValidator, usersController.processRegister);

module.exports = router;