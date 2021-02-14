const bcrypt = require('bcrypt');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

// Sign up service
const signUp = (data, res, next) => {
	let { name, email, password } = data;
	// Hashing Password
	bcrypt.hash(
		password,
		parseInt(process.env.BCRYPT_SALT_LENGTH),
		(err, hash) => {
			if (err) return next(err);

			// Creating SQL Query to insert Data
			let query = `
				INSERT INTO USERS(NAME, EMAIL_ADDRESS, PASSWORD)
					VALUES(
						"${name}",
						"${email}",
						"${hash}"
					);
				`;

			// Apply query to SQL
			db.query(query, (err) => {
				// Database Error Handling
				if (err) {
					if (err.code === 'ER_DUP_ENTRY')
						next(new ErrorResponse('Email address already in use!', 403));
					else next(err);
					return;
				}

				// Find Number of users with same name
				query = `
					SELECT COUNT(ID) AS num FROM USERS WHERE NAME LIKE '${name}';
				`;
				db.query(query, (err, result) => {
					if (err) return next(err);

					// Unique Username create (name.number)
					let username = name.replace(/\s/g, '.').toLowerCase();
					if (result[0].num > 1) username += result[0].num;

					// Update User with unique username
					query = `
						UPDATE USERS SET USERNAME = "${username}" WHERE EMAIL_ADDRESS = "${email}";
					`;
					db.query(query, (err) => {
						if (err) return next(err);

						// Successful Response
						let data = {
							payload: {
								email,
							},
							message:
								'User registration successful. Kindly verify your email address',
							emailVerified: false,
						};

						// create Token and send with cookies
						sendTokenResponseWithCookie(data, 201, res, next);
					});
				});
			});
		}
	);
};

// Sign in service
const signIn = (data, res, next) => {
	// Finding user with given email address
	let query = `
		SELECT 
			email_address, 
			email_verified, 
			password 
		FROM USERS WHERE email_address = "${data.email}";
	`;
	db.query(query, (err, result) => {
		if (err) return next(err);

		// validate results
		if (result.length === 0)
			return next(
				new ErrorResponse(
					'Incorrect Email address or Password! Please try again',
					401
				)
			);

		// extract emails, password and email_verification_status
		let { email_address: email, password, email_verified } = result[0];

		bcrypt.compare(data.password, password, function (err, matched) {
			if (err) return next(err);

			// Password don't match
			if (!matched)
				return next(
					new ErrorResponse(
						'Incorrect Email address or Password! Please try again',
						401
					)
				);

			// Successful Response
			let data = {
				payload: {
					email,
				},
				message: 'Successfully signed in',
				emailVerified: email_verified === 0 ? false : true,
			};

			// create Token and send with cookies
			sendTokenResponseWithCookie(data, 200, res, next);
		});
	});
};

// Send Token with Cookie
const sendTokenResponseWithCookie = (data, statusCode, res, next) => {
	// Create Token
	jwt.sign(
		data.payload,
		process.env.JWT_SECRET,
		{ expiresIn: '30d' },
		(err, token) => {
			if (err) return next(err);

			// Create access token
			let accessToken = token.replace(/[.]/g, process.env.JWT_RANDOM_STRING);

			// Set Options for Cookie
			const cookieOptions = {
				maxAge: process.env.JWT_COOKIE_MAX_AGE,
				httpOnly: true,
			};

			// Send responses to client
			res
				.status(statusCode)
				.cookie('DEV_TOKEN', accessToken, cookieOptions)
				.json({
					success: true,
					message: data.message,
					responses: {
						accessToken,
						emailVerified: data.emailVerified,
					},
				});
		}
	);
};

module.exports = { signUp, signIn };
