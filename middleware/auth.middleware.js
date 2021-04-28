const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const partiallyProtectedRoute = [
	/\/user\/(\d+)\/profile$/,
	/\/posts$/,
	/\/developers$/,
	/\/developers\/([a-z1-9.]+)$/,
];

exports.checkAuthentication = asyncHandler((req, res, next) => {
	// Proceed for authentication
	let token;

	// Check request headers has a "authorization" key
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
		// Set token from request headers
		token = req.headers.authorization.split(' ')[1]; // Bearer tokenXXX
	} else if (req.cookies.DEV_TOKEN) {
		// Set token form cookie
		token = req.cookies.DEV_TOKEN;
	}

	// check token exists or not
	if (!token) {
		// public views
		if (
			req.method === 'GET' &&
			req.query.view === 'public' &&
			req.query.url &&
			req.originalUrl.split('?')[0].includes(req.query.url)
		) {
			let matchedURL = false;

			partiallyProtectedRoute.forEach((urlExp) => {
				if (urlExp.test(req.query.url)) matchedURL = true;
			});

			if (matchedURL) return next();
		}

		// Otherwise throw 401 unauthorized
		throw new ErrorResponse(`You are not unauthorized to access the resource`, 401);
	}

	// Remove Random String from token
	const keyPattern = new RegExp(`${process.env.JWT_RANDOM_STRING}`, 'g');
	token = token.replace(keyPattern, '.');

	// Decode and Verify the token
	jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
		if (err) throw new ErrorResponse(`Session Expired! Kindly login again`, 403);

		// Finding user with decoded email address
		let query = `
                SELECT 
                    email_address as email, 
                    email_verified, 
                    name, username, id,
					verification_email_sent,
					new_account,
                    created_at, updated_at 
                    FROM USERS WHERE email_address = "${decodedToken.email}";
            `;

		db.query(query, (err, result) => {
			if (err) next(err);

			// validate results
			if (result.length === 0)
				return next(
					new ErrorResponse(
						'Oops! No user found. Maybe your account disabled or permanently deleted.',
						403
					)
				);

			// set user object to the request
			req.user = result[0];

			// TYPE CAST all Boolean to true/false
			req.user.email_verified = req.user.email_verified === 0 ? false : true;
			req.user.new_account = req.user.new_account === 0 ? false : true;
			req.user.verification_email_sent = req.user.verification_email_sent === 0 ? false : true;

			if (
				req.method !== 'GET' &&
				Object.keys(req.params).includes('user_id') &&
				parseInt(req.params.user_id) !== req.user.id
			)
				next(new ErrorResponse('You are not unauthorized to access the resource', 403));

			// Proceed to next functions
			next();
		});
	});
});

exports.experienceAuthorize = (req, res, next) => {
	// If new user directly reject
	if (req.user.new_account)
		return next(new ErrorResponse('Please first create your developer profile', 403));

	// Check user authorize the experience
	let query = `
		SELECT 
			id, 
			starting_date, 
			ending_date 
		FROM USER_EXPERIENCES 
		WHERE ID=${req.params.exp_id} AND USER_ID=${req.user.id}
	`;

	db.query(query, (err, result) => {
		if (err) return next(err);

		// check result array has one element
		if (result.length === 0)
			return next(new ErrorResponse('Oops! Something went wrong with your request.', 404));

		// Add job_exp to request for checking incoming Fields
		req.job_exp = result[0];
		next();
	});
};

exports.educationAuthorize = (req, res, next) => {
	// If new user directly reject
	if (req.user.new_account)
		return next(new ErrorResponse('Please first create your developer profile', 403));

	// Check user authorize the education
	let query = `
		SELECT 
			id, 
			starting_date, 
			ending_date 
		FROM USER_EDUCATIONS 
		WHERE ID=${req.params.edu_id} AND USER_ID=${req.user.id}
	`;

	db.query(query, (err, result) => {
		if (err) return next(err);

		// check result array has one element
		if (result.length === 0)
			return next(new ErrorResponse('Oops! Something went wrong with your request.', 404));

		// Add edu_cred to request for checking incoming Fields
		req.edu_cred = result[0];
		next();
	});
};

exports.postAuthorize = (req, res, next) => {
	// If new user directly reject
	if (req.user.new_account)
		return next(new ErrorResponse('Please first create your developer profile', 403));

	// Check user authorize the experience
	let query = `
		SELECT 
			id,
			user_id
		FROM POSTS 
		WHERE ID=${req.params.post_id} AND USER_ID=${req.user.id}
	`;

	db.query(query, (err, result) => {
		if (err) return next(err);

		// check result array has one element
		if (result.length === 0)
			return next(new ErrorResponse('Oops! Something went wrong with your request.', 404));

		// Add post to request for checking incoming Fields
		req.post = result[0];
		next();
	});
};

exports.postCommentAuthorize = (req, res, next) => {
	// If new user directly reject
	if (req.user.new_account)
		return next(new ErrorResponse('Please first create your developer profile', 403));

	// Check user authorize the experience
	let query = `
		SELECT 
			id,
			user_id,
			post_id
		FROM POST_COMMENTS 
		WHERE POST_ID=${req.params.post_id} && 
			USER_ID=${req.user.id} &&
			id=${req.params.comment_id}
	`;

	db.query(query, (err, result) => {
		if (err) return next(err);

		// check result array has one element
		if (result.length === 0)
			return next(new ErrorResponse('Oops! Something went wrong with your request', 404));

		// Add post to request for checking incoming Fields
		req.post_comment = result[0];
		next();
	});
};
