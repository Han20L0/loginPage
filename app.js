/** @format */

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Route sederhana
app.get("/", (req, res) => {
	res.send("Hello World from Backend!");
});

// Menjalankan server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
