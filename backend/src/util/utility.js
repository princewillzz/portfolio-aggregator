const mongoose = require("mongoose");

/**
 *
 * @param {mongoose validation error} error instance of mongoose validation error
 * @param {response object} res
 * @returns json response containing list of errors and its reasons
 */
const handleMongooseValidationError = (error, res, errorStatus) => {
	const errors = error.errors;

	const customError = Object.keys(errors).map((field) => {
		let message = errors[field].message;
		if (errors[field] instanceof mongoose.Error.CastError) {
			message = "Invalid Data!!";
		}
		return {
			field: errors[field].path,
			message: message,
		};
	});
	return res.status(errorStatus || 400).json({ errors: customError });
};

const isNull = (_it) => _it === null || _it === undefined || _it === "";

function isValidURL(string) {
	var res = string.match(
		/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
	);
	return res !== null;
}
module.exports = {
	handleMongooseValidationError,
	isNull,
	isValidURL,
};
