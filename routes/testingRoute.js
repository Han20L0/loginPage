/** @format */

const express = require("express");
//const router = require(".");
const app = express();
const multer = require("multer");

// Middleware untuk memproses form data (multipart/form-data)
const upload = multer();

// Route untuk menerima berbagai jenis data
app.post("/api/data", upload.none(), (req, res) => {
	// Cek content-type untuk menentukan jenis pengiriman data
	const contentType = req.headers["content-type"];

	if (contentType.includes("multipart/form-data")) {
		// Form Data (multipart/form-data)
		const { name } = req.body;
		console.log(req.body);
		res.json({ message: `Hello from Form Data, ${name}` });
	} else if (contentType.includes("application/x-www-form-urlencoded")) {
		// URL-encoded (application/x-www-form-urlencoded)
		const { name } = req.body;
		console.log(req.body);
		res.json({ message: `Hello from URL-encoded, ${name}` });
	} else if (contentType.includes("application/json")) {
		// Raw JSON (application/json)
		const { name } = req.body;
		console.log(req.body);
		res.json({ message: `Hello from JSON, ${name}` });
	} else if (contentType.includes("text/html")) {
		// Raw HTML (text/html)
		const rawHtml = req.body;
		console.log(req.body);
		res.json({ message: `HTML received`, content: rawHtml });
	} else {
		res.status(400).json({ error: "Unsupported content type" });
	}
});

module.exports = app;
