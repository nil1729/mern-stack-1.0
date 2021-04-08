const ErrorResponse = require('../utils/errorResponse');
const checker = require('../utils/checkFields');
const { signUp, signIn } = require('../services/auth.services');

/**
 *
 * @desc User Sign Up Handler
 * @route /api/v1/auth/register
 * @access public
 *
 */

exports.registerHandler = (req, res, next) => {
	let { name, email, password } = req.body;

	// Check Body for required fields
	if (!name || !email || !password || (name && name.trim().length === 0)) {
		next(new ErrorResponse('Please provide all required fields', 400));
	}
	// Check for Valid inputs
	name = name.replace(/\s{2,}/g, ' ');
	if (!checker.alphabetic(name)) {
		next(new ErrorResponse('Please provide a Name with only alphabetic characters', 400));
	}
	if (!checker.email(email)) {
		next(new ErrorResponse('Please provide a valid email address', 400));
	}
	if (!checker.password(password)) {
		next(new ErrorResponse('Please provide a strong password', 400));
	}

	// Call Sign Up Service for create user account
	signUp({ name, email, password }, res, next);
};

/**
 *
 * @desc User Sign In Handler
 * @route /api/v1/auth/login
 * @access public
 *
 */
exports.loginHandler = (req, res, next) => {
	let { email, password } = req.body;

	// Check Body for required fields
	if (!email || !password) {
		next(new ErrorResponse('Please provide all required fields', 400));
	}
	if (!checker.email(email)) {
		next(new ErrorResponse('Please provide a valid email address', 400));
	}

	// Call Sign In Service for login user account
	signIn({ email, password }, res, next);
};

/**
 *
 * @desc Get User Details Handler
 * @route /api/v1/auth/user
 * @access private
 *
 */
exports.userHandler = (req, res, next) => {
	let message;
	if (!req.user.email_verified && req.user.verification_email_sent)
		message =
			'Kindly verify your Email Address. A verification link has sent to your email address';
	delete req.user.verification_email_sent;
	return res.status(200).json({
		success: true,
		message,
		user: req.user,
	});
};
