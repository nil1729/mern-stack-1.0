const ErrorResponse = require('../utils/errorResponse');

module.exports = (err, req, res, next) => {
	const error = { ...err };
	error.message = err.message;
	console.log(err);

	return res.status(error.statusCode || 500).json({
		success: false,
		error: error.message.trim() || 'Something went wrong! Please try again.',
	});
};
