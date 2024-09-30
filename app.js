/** @format */

const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const express = require("express");
const router = require("./routes");
const app = express();
const PORT = 3000;

// Middleware untuk parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware untuk parsing JSON
app.use(express.json());

// Middleware untuk menerima dan mem-parsing raw HTML (text/html)
app.use(express.text({ type: "text/html" }));

app.use(router);
app.set("view engine", "ejs");
app.use(errorHandler);
app.use(cors());

// Menjalankan server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
