const bcrypt = require('bcrypt');
const ErrorResponse = require('../utils/errorResponse');

const signUp = async (data) => {
	let { name, email, password } = data;
	// Hashing Password
	return bcrypt.hash(
		password,
		parseInt(process.env.BCRYPT_SALT_LENGTH),
		(err, hash) => {
			if (err) throw err;

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
			return db.query(query, (err) => {
				// Database Error Handling
				if (err) {
					if (err.code === 'ER_DUP_ENTRY')
						return new ErrorResponse('Email address already in use!', 403);
					else throw err;
				}

				// Find Number of users with same name
				query = `
					SELECT COUNT(ID) AS num FROM USERS WHERE NAME LIKE '${name}';
				`;
				return db.query(query, (err, result) => {
					if (err) throw err;

					// Unique Username create (name.number)
					let username = name.replace(/\s/g, '.');
					if (result[0].num > 1) username += result[0].num;

					// Update User with unique username
					query = `
						UPDATE USERS SET USERNAME = "${username}" WHERE EMAIL_ADDRESS = "${email}";
					`;
					return db.query(query, (err, result) => {
						if (err) throw err;

						// Successful Response
						return {
							success: true,
							message:
								'User registration successful. Kindly verify your email address',
							result: {
								accessToken: null,
								emailVerified: false,
							},
						};
					});
				});
			});
		}
	);
};

module.exports = { signUp };
