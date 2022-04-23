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

module.exports = {
	handleMongooseValidationError,
};
