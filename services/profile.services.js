const ErrorResponse = require('../utils/errorResponse');

exports.createProfile = (data, res, next) => {
	// Create query for SQL
	let fields = ``;
	let values = ``;
	data.incomingFields.forEach((key) => {
		fields += `${key},`;
		values += `"${data.body[key]}",`;
	});
	fields += `user_id`;
	values += `${data.user.id}`;

	let query = `
        INSERT INTO USER_PROFILES(${fields})
            VALUES(${values});
    `;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		// update new account status for current user
		query = `
			UPDATE USERS SET NEW_ACCOUNT = FALSE WHERE ID = ${data.user.id};
		`;

		db.query(query, (err, result) => {
			if (err) return next(err);

			// Send responses to client
			res.status(201).json({
				success: true,
				message: 'Developer profile created successfully',
			});
		});
	});
};

exports.updateProfile = (data, res, next) => {
	// Create query for SQL
	let setQuery = ``;

	data.incomingFields.forEach((key) => {
		setQuery += `${key}="${data.body[key]}",`;
	});

	// remove the last comma from the query string
	setQuery = setQuery.slice(0, -1);

	let query = `
		UPDATE USER_PROFILES SET ${setQuery} WHERE USER_ID = ${data.user.id};
	`;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		// Send responses to client
		res.status(200).json({
			success: true,
			message: 'Developer profile updated successfully',
		});
	});
};

exports.getProfile = (user_id, fields, res, next) => {
	// Create string for select fields
	let queryFields = ``;
	fields.forEach((field) => (queryFields += `${field},`));
	queryFields = queryFields.slice(0, -1);

	// Create query for getting user profile details
	let query = `
		SELECT 
			${queryFields}
		FROM USERS
		INNER JOIN USER_PROFILES ON USERS.ID = USER_PROFILES.USER_ID
		WHERE USERS.ID = ${user_id};
	`;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		if (result.length < 1)
			return next(
				new ErrorResponse(
					"We look into our records. But didn't find any user",
					404
				)
			);

		// Send responses to client
		return res.status(200).json({
			success: true,
			user_profile: result[0],
		});
	});
};

exports.addExperience = (data, res, next) => {
	// Create query for SQL
	let fields = ``;
	let values = ``;
	data.incomingFields.forEach((key) => {
		fields += `${key},`;
		values += `"${data.body[key]}",`;
	});
	fields += `user_id`;
	values += `${data.user.id}`;

	let query = `
        INSERT INTO USER_EXPERIENCES(${fields})
            VALUES(${values});
    `;

	// execute the query
	db.query(query, (err) => {
		if (err) return next(err);

		// Send responses to client
		res.status(201).json({
			success: true,
			message: 'Job experience added to your profile',
		});
	});
};
