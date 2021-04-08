module.exports = (err, req, res, next) => {
	const error = { ...err };
	error.message = err.message;
	error.errors = err.errors;
	console.log(err);

	return res.status(error.statusCode || 500).json({
		success: false,
		message: error.message.trim() || 'Something went wrong! Please try again.',
		errors: error.errors,
	});
};
