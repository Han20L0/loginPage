/** @format */

function errorHandler(error, req, res, next) {
	console.log(error); // Log the entire error object for debugging
	console.log(error.name); // Log the error name for debugging

	let status = 500;
	let message = "Internal server error";

	switch (error.name) {
		case "SequelizeValidationError":
		case "SequelizeUniqueConstraintError":
			status = 400;
			// Extracting messages from the error object
			message = error.errors.map((err) => err.message).join(", ");
			break;
		case "EmptyPassword":
			status = 401;
			message = "Password cannot be empty";
			break;
		case "EmptyUsername":
			status = 401;
			message = "Username cannot be empty";
		case "JsonWebTokenError":
		case "InvalidToken":
			status = 401;
			message = "Token is invalid";
			break;
		case "InvalidUser":
			status = 401;
			message = "Invalid User";
			break;
		case "Forbidden":
			status = 403;
			message = "You do not have permission";
			break;
		case "InvalidId":
			status = 404;
			message = "Data not found";
			break;
		case "Unauthorized":
			status = 401;
			message = error.message || "Unauthorized";
			break;
		default:
			// Fallback for unknown errors
			console.error("Unhandled error:", error); // For debugging purposes
			break;
	}

	res.status(status).json({ message });
}

module.exports = errorHandler;
