const bcrypt = require('bcrypt');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const checker = require('../utils/checkFields');

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
						return res.status(201).json({
							success: true,
							message:
								'User registration successful. Kindly verify your email address',
							responses: {
								accessToken: null,
								emailVerified: false,
							},
						});
					});
				});
			});
		}
	);
});

const loginHandler = (req, res, next) => {};

module.exports = {
	registerHandler,
	loginHandler,
};
