exports.addPost = (data, res, next) => {
	let query = `
        INSERT INTO POSTS(body, user_id)
            VALUES(${data.body}, ${data.user.id});
    `;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		query = `
			SELECT 
				concat(substr(p.body, 1, 300), "....") as body, 
				p.id, p.user_id as author_id, p.created_at, 
				up.profile_image_url as author_dp_url, 
				u.avatar_colour_code as author_avatar_color, 
				u.name as author_name,
				max(r.reaction) as reaction,
				count(c.id) as comments
			FROM POSTS p
				INNER JOIN USER_PROFILES up ON p.user_id = up.user_id
				INNER JOIN USERS u ON u.id = p.user_id
				LEFT JOIN POST_COMMENTS c ON c.post_id = p.id
				LEFT JOIN POST_REACTIONS r ON r.post_id = p.id && r.user_id = ${data.user.id}
			WHERE p.id=${result.insertId};
		`;

		db.query(query, (err, result) => {
			if (err) return next(err);

			res.status(201).json({
				success: true,
				message: 'Your new post added to your account',
				newPost: result[0],
			});
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
            VALUES(${data.body}, ${data.user.id}, ${data.post_id});
    `;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		query = `
			SELECT 
				c.body as body, c.post_id,
				c.id, c.user_id as author_id, c.created_at, 
				up.profile_image_url as author_dp_url, 
				u.avatar_colour_code as author_avatar_color, 
				u.name as author_name
			FROM POST_COMMENTS c
			INNER JOIN USER_PROFILES up ON c.user_id = up.user_id
			INNER JOIN USERS u ON u.id = c.user_id
			WHERE c.id = ${result.insertId}
		`;

		db.query(query, (err, result) => {
			if (err) return next(err);

			res.status(201).json({
				success: true,
				message: 'Your comment added to the post',
				newComment: result[0],
			});
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
			message: 'Your comment updated successfully',
		});
	});
};

// add reaction
exports.addReaction = (reaction, post_id, user_id, res, next) => {
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
exports.updateReaction = (reaction, post_id, user_id, res, next) => {
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
			message: 'Your reaction updated successfully',
		});
	});
};

//delete reaction
exports.deleteReaction = (post_id, user_id, res, next) => {
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
			message: 'Your reaction deleted successfully',
		});
	});
};
