/** @format */

const { verifyToken } = require("../helpers/jwtHelper");

const authenticate = (req, res, next) => {
	try {
		const accessToken = req.headers.authorization?.split(" ")[1];

		if (!accessToken) {
			// Menggunakan next() untuk meneruskan kesalahan
			return next({
				name: "Unauthorized",
				message: "No token provided",
			});
		}

		const decoded = verifyToken(accessToken);

		req.user = decoded; // Attach the decoded user info to the request object
		next(); // Pass control to the next middleware or route handler
	} catch (error) {
		if (
			error.name === "JsonWebTokenError" ||
			error.name === "TokenExpiredError"
		) {
			next({ name: "Unauthorized", message: "Invalid or expired token" });
		} else {
			next(error); // Re-throw unexpected errors
		}
	}
};

module.exports = authenticate;
