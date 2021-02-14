const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

exports.checkAuthentication = asyncHandler((req, res, next) => {
	let token;
	// Check request headers has a "authorization" key
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer ')
	) {
		// Set token from request headers
		token = req.headers.authorization.split(' ')[1]; // Bearer tokenXXX
	} else if (req.cookies.DEV_TOKEN) {
		// Set token form cookie
		token = req.cookies.DEV_TOKEN;
	}

	// check token exists or not
	if (!token) {
		throw new ErrorResponse(
			`You are not unauthorized to access the resource`,
			401
		);
	}

	// Remove Random String from token
	const keyPattern = new RegExp(`(${process.env.JWT_RANDOM_STRING})`, 'g');
	token = token.replace(keyPattern, '.');

	// Decode and Verify the token
	jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
		if (err)
			throw new ErrorResponse(`Session Expired! Kindly login again`, 403);

		// Finding user with decoded email address
		let query = `
                SELECT 
                    email_address as email, 
                    email_verified as emailVerified, 
                    name, username, id,
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
						401
					)
				);

			// set user object to the request
			req.user = result[0];

			// Proceed to next functions
			next();
		});
	});
});
