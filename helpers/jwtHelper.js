/** @format */
require("dotenv").config();

const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY || "BBKHIT_Kaltim"; // Ganti dengan secret key kamu
console.log("Secret Key:", process.env.SECRET_KEY);

const generateToken = (payload) => {
	console.log("Payload yang digunakan untuk generate token:", payload);
	return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const verifyToken = (token) => {
	try {
		return jwt.verify(token, secretKey);
	} catch (err) {
		return null; // Token tidak valid
	}
};

const decodeToken = (token) => {
	return jwt.decode(token);
};

module.exports = { generateToken, verifyToken, decodeToken };
