const ErrorResponse = require('../utils/errorResponse'),
	xss = require('xss'),
	fetch = require('node-fetch');

exports.createProfile = (data, res, next) => {
	// Create query for SQL
	let fields = ``;
	let values = ``;

	// JSON Stringified bio
	if (data.body.bio && data.body.bio.length > 0) {
		fields += `bio,`;
		values += `${data.body.bio},`;
		delete data.body.bio;
		data.incomingFields = data.incomingFields.filter((it) => it !== 'bio');
	}

	// Other fields
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

	// JSON Stringified bio
	if (data.body.bio && data.body.bio.length > 0) {
		setQuery += `bio=${data.body.bio},`;
		delete data.body.bio;
		data.incomingFields = data.incomingFields.filter((it) => it !== 'bio');
	}

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
		return res.status(200).json({
			success: true,
			message: 'Developer profile updated successfully',
		});
	});
};

exports.getProfile = (username, fields, res, next) => {
	// Create string for select fields
	let queryFields = ``;
	fields.publicUserFields.forEach((field) => (queryFields += `${field},`));
	queryFields = queryFields.slice(0, -1);

	// Create query for getting user profile details
	let query = `
		SELECT 
			${queryFields}
		FROM USERS
		INNER JOIN USER_PROFILES ON USERS.ID = USER_PROFILES.USER_ID
		WHERE USERS.USERNAME = "${username}";
	`;

	let user_profile,
		job_experiences = [],
		education_credits = [];

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		if (result.length < 1)
			return next(new ErrorResponse("We look into our records. But didn't find any user", 404));
		user_profile = result[0];

		// Create string for select fields
		queryFields = ``;
		fields.publicJobFields.forEach((field) => (queryFields += `${field},`));
		queryFields = queryFields.slice(0, -1);

		// Create query for getting user profile details
		query = `
			SELECT 
				id,
				${queryFields}
			FROM USER_EXPERIENCES ue
			WHERE USER_ID = ${user_profile.dev_id}
			ORDER BY ue.id DESC
			LIMIT 0, 2;
		`;

		// execute the query
		db.query(query, (err, jobResults) => {
			if (err) return next(err);

			job_experiences = jobResults;

			// Create string for select fields
			queryFields = ``;
			fields.publicEduFields.forEach((field) => (queryFields += `${field},`));
			queryFields = queryFields.slice(0, -1);

			// Create query for getting user profile details
			query = `
				SELECT 
					id,
					${queryFields}
				FROM USER_EDUCATIONS ue
				WHERE USER_ID = ${user_profile.dev_id}
				ORDER BY ue.id DESC
				LIMIT 0, 2;
			`;

			// execute the query
			db.query(query, (err, eduResults) => {
				if (err) return next(err);

				education_credits = eduResults;

				let response = {
					success: true,
					results: {
						user_profile: { ...user_profile, bio: xss(user_profile.bio) },
						user_job_experiences: job_experiences.map((it) => {
							return { ...it, job_description: xss(it.job_description) };
						}),
						user_education_credits: education_credits.map((it) => {
							return { ...it, program_description: xss(it.program_description) };
						}),
					},
				};

				// Fetch Github Stats
				if (user_profile.github_username) {
					fetch(
						`https://api.github.com/users/${user_profile.github_username}/repos?sort=updated&per_page=5&direction=desc`,
						{
							headers: {
								Authorization: `token ${process.env.GITHUB_TOKEN}`,
							},
						}
					)
						.then((res) => res.json())
						.then((data) => {
							if (Array.isArray(data)) {
								response.results.git_stats = data.map((it) => {
									let {
										id,
										name,
										html_url,
										description,
										stargazers_count: stars,
										watchers_count: watchers,
										forks_count: forks,
									} = it;
									return {
										id,
										name,
										html_url,
										description,
										stars,
										watchers,
										forks,
									};
								});
							}
							return res.status(200).json(response);
						})
						.catch((err) => {
							return next(err);
						});
				} else return res.status(200).json(response);
			});
		});
	});
};

exports.addExperience = (data, res, next) => {
	// Create query for SQL
	let fields = ``;
	let values = ``;

	// JSON Stringified bio
	if (data.body.job_description && data.body.job_description.length > 0) {
		fields += `job_description,`;
		values += `${data.body.job_description},`;
		delete data.body.job_description;
		data.incomingFields = data.incomingFields.filter((it) => it !== 'job_description');
	}

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
		return res.status(201).json({
			success: true,
			message: 'Job experience added to your profile',
		});
	});
};

exports.updateExperience = (data, res, next) => {
	// Create query for SQL
	let setQuery = ``;

	data.incomingFields.forEach((key) => {
		setQuery += `${key}="${data.body[key]}",`;
	});

	// remove the last comma from the query string
	setQuery = setQuery.slice(0, -1);

	let query = `
		UPDATE USER_EXPERIENCES SET ${setQuery} WHERE USER_ID = ${data.user.id} AND ID = ${data.job_exp.id};
	`;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		// Send responses to client
		return res.status(200).json({
			success: true,
			message: 'Job experience updated successfully',
		});
	});
};

exports.deleteExperience = (user_id, job_exp_id, res, next) => {
	let query = `
		DELETE FROM USER_EXPERIENCES WHERE USER_ID = ${user_id} AND ID = ${job_exp_id};
	`;

	// execute the query
	db.query(query, (err) => {
		if (err) return next(err);

		// Send responses to client
		return res.status(200).json({
			success: true,
			message: 'Job experience deleted',
		});
	});
};

exports.addEducation = (data, res, next) => {
	// Create query for SQL
	let fields = ``;
	let values = ``;

	// JSON Stringified bio
	if (data.body.program_description && data.body.program_description.length > 0) {
		fields += `program_description,`;
		values += `${data.body.program_description},`;
		delete data.body.program_description;
		data.incomingFields = data.incomingFields.filter((it) => it !== 'program_description');
	}

	data.incomingFields.forEach((key) => {
		fields += `${key},`;
		values += `"${data.body[key]}",`;
	});
	fields += `user_id`;
	values += `${data.user.id}`;

	let query = `
        INSERT INTO USER_EDUCATIONS(${fields})
            VALUES(${values});
    `;

	// execute the query
	db.query(query, (err) => {
		if (err) return next(err);

		// Send responses to client
		return res.status(201).json({
			success: true,
			message: 'Education credential added to your profile',
		});
	});
};

exports.updateEducation = (data, res, next) => {
	// Create query for SQL
	let setQuery = ``;

	data.incomingFields.forEach((key) => {
		setQuery += `${key}="${data.body[key]}",`;
	});

	// remove the last comma from the query string
	setQuery = setQuery.slice(0, -1);

	let query = `
		UPDATE USER_EDUCATIONS SET ${setQuery} WHERE USER_ID = ${data.user.id} AND ID = ${data.edu_cred.id};
	`;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		// Send responses to client
		return res.status(200).json({
			success: true,
			message: 'Education credential updated successfully',
		});
	});
};

exports.deleteEducation = (user_id, edu_cred_id, res, next) => {
	let query = `
		DELETE FROM USER_EDUCATIONS WHERE USER_ID = ${user_id} AND ID = ${edu_cred_id};
	`;

	// execute the query
	db.query(query, (err) => {
		if (err) return next(err);

		// Send responses to client
		return res.status(200).json({
			success: true,
			message: 'Education credential deleted',
		});
	});
};
