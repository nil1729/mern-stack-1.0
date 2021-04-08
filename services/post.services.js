const ErrorResponse = require('../utils/errorResponse');

exports.addPost = (data, res, next) => {
	let query = `
        INSERT INTO POSTS(body, user_id)
            VALUES("${data.body}", ${data.user.id});
    `;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		res.status(201).json({
			success: true,
			message:
				'Your new post added to your account',
		});
	});
};

exports.updatePost = (data, res, next) => {
	let query = `
        UPDATE POSTS SET body = "${data.body}"
			WHERE ID = ${data.post_id};
    `;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		res.status(201).json({
			success: true,
			message: 'Your post updated successfully',
		});
	});
};
