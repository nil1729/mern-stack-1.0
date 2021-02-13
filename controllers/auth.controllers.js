const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const checker = require('../utils/checkFields');
const { signUp } = require('../services/auth.services');

/**
 *
 * @desc User Sign Up Handler
 * @route /api/v1/auth/register
 * @access public
 *
 */

const registerHandler = asyncHandler((req, res, next) => {
	let { name, email, password } = req.body;

	// Check Body for required fields
	if (!name || !email || !password || (name && name.trim().length === 0)) {
		throw new ErrorResponse('Please provide all required fields', 400);
	}
	// Check for Valid inputs
	name = name.replace(/\s{2,}/g, ' ');
	if (!checker.alphabetic(name)) {
		throw new ErrorResponse(
			'Please provide a Name with only alphabetic characters',
			400
		);
	}
	if (!checker.email(email)) {
		throw new ErrorResponse('Please provide a valid email address', 400);
	}
	if (!checker.password(password)) {
		throw new ErrorResponse('Please provide a strong password', 400);
	}

	// Call Sign Up Service for create user account
	signUp({ name, email, password }, res, next);
});

const loginHandler = (req, res, next) => {};

module.exports = {
	registerHandler,
	loginHandler,
};
