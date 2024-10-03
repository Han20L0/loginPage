/** @format */

const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const authenticate = require("../middlewares/authenticates");

router.post("/register", loginController.register);

router.post("/login", loginController.login);

router.get("/profile/all", authenticate, loginController.getAllUsers);

router.get("/profile/token", authenticate, loginController.getUserByToken);

router.get("/query", authenticate, loginController.PagFilSort);

module.exports = router;
