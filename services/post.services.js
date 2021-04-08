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

		res.status(200).json({
			success: true,
			message: 'Your post updated successfully',
		});
	});
};

exports.addComment = (data, res, next) => {
	let query = `
        INSERT INTO POST_COMMENTS(body, user_id,post_id)
            VALUES("${data.body}", ${data.user.id}, ${data.post_id});
    `;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		res.status(201).json({
			success: true,
			message: 'Your comment added to the post',
		});
	});
};

exports.updateComment = (data, res, next) => {
	let query = `
        UPDATE POST_COMMENTS SET body = "${data.body}"
			WHERE ID = ${data.comment.id} &&
				user_id = ${data.comment.user_id} &&
				post_id =${data.comment.post_id};
    `;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		res.status(200).json({
			success: true,
			message:
				'Your comment updated successfully',
		});
	});
};

// add reaction
exports.addReaction = (
	reaction,
	post_id,
	user_id,
	res,
	next
) => {
	let query = `
        INSERT INTO POST_REACTIONS(reaction, user_id, post_id)
            VALUES(${reaction}, ${user_id}, ${post_id});
    `;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		res.status(201).json({
			success: true,
			message: 'Your reaction added to the post',
		});
	});
};

//update reaction
exports.updateReaction = (
	reaction,
	post_id,
	user_id,
	res,
	next
) => {
	let query = `
        UPDATE POST_REACTIONS SET reaction = ${reaction} 
			WHERE user_id = ${user_id} &&
				post_id =${post_id};
    `;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		res.status(200).json({
			success: true,
			message:
				'Your reaction updated successfully',
		});
	});
};

//delete reaction
exports.deleteReaction = (
	post_id,
	user_id,
	res,
	next
) => {
	let query = `
        DELETE FROM POST_REACTIONS 
			WHERE user_id = ${user_id} &&
				post_id =${post_id};
    `;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		res.status(200).json({
			success: true,
			message:
				'Your reaction deleted successfully',
		});
	});
};
