/** @format */

const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticates");
const testingRoute = require("./testingRoute");
//const userRoute = require("./userRoute");

// Route sederhana
router.get("/", authenticate, (req, res) => {
	res.status(200).json({
		message: "Welcome to the Express.js API!",
	});
});

router.use(testingRoute);
//router.use(userRoute);

module.exports = router;
