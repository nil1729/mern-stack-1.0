const ErrorResponse = require('../utils/errorResponse'),
	checker = require('../utils/checkFields'),
	xss = require('xss'),
	{
		addPost,
		updatePost,
		addComment,
		updateComment,
		addReaction,
		updateReaction,
		deleteReaction,
	} = require('../services/post.services');

/**
 *
 * @desc Add new Post to DevConnector
 * @route POST /api/v1/posts/
 * @access private
 *
 */

exports.addPostHandler = (req, res, next) => {
	// Checking for body
	let { body } = req.body;
	if (!body || body.trim().length === 0)
		return next(new ErrorResponse('Please add some texts to create a new post', 400));

	// Filter the body for XSS Protection
	body = xss(body);

	// Replace all `"` or `'` with `\'` & `\"`
	body = JSON.stringify(body);

	// Checking For Duplicates
	let query = `
        SELECT COUNT(*) as duplicatePost 
			FROM POSTS 
			WHERE body = ${body} && 
				user_id=${req.user.id};
    `;

	db.query(query, (err, results) => {
		if (err) return next(err);

		if (results[0].duplicatePost > 0) {
			return next(new ErrorResponse('The Post you trying to add is already exists', 400));
		}

		// Call Add Post Service
		addPost({ body, user: req.user }, res, next);
	});
};

exports.updatePostHandler = (req, res, next) => {
	// Checking for body
	let { body } = req.body;
	if (!body || body.trim().length === 0)
		return next(new ErrorResponse('Please add some texts to update the post', 400));

	// Filter the body for XSS Protection
	body = xss(body);

	// Checking For Duplicates
	let query = `
        SELECT id as post_id 
			FROM POSTS 
			WHERE body = '${body}' && 
				user_id=${req.user.id};
    `;

	db.query(query, (err, results) => {
		if (err) return next(err);

		// Duplicate checking
		if (results.length > 0 && results[0].post_id !== req.post.id) {
			return next(new ErrorResponse('The Post you trying to add is already exists', 400));
		}

		// Call Add Post Service
		updatePost(
			{
				body,
				user: req.user,
				post_id: req.post.id,
			},
			res,
			next
		);
	});
};

exports.deletePostHandler = (req, res, next) => {
	// Set up multi statement query
	let query = `
		DELETE FROM POST_COMMENTS 
			WHERE post_id = '${req.post.id}';
		DELETE FROM POST_REACTIONS 
			WHERE post_id = '${req.post.id}';
        DELETE FROM POSTS 
			WHERE id = '${req.post.id}' && 
				user_id=${req.user.id};

    `;

	db.query(query, (err, results) => {
		if (err) return next(err);

		// Send responses to client
		res.status(201).json({
			success: true,
			message: 'Your post deleted successfully',
		});
	});
};

exports.addCommentHandler = (req, res, next) => {
	// Checking for body
	let { body } = req.body;
	if (!body || body.trim().length === 0)
		return next(new ErrorResponse('Please add some texts to add a comment', 400));

	// Filter the body for XSS Protection
	body = xss(body);

	// Replace all `"` or `'` with `\'` & `\"`
	body = JSON.stringify(body);

	// Checking For Duplicates
	let query = `
        SELECT COUNT(id) as postCount 
			FROM POSTS 
			WHERE id = '${req.params.post_id}';
    `;

	db.query(query, (err, results) => {
		if (err) return next(err);

		if (results[0].postCount === 0) {
			return next(new ErrorResponse('Oops! requested post not found', 400));
		}

		// Checking For Duplicates
		query = `
        	SELECT COUNT(*) as duplicateComment 
				FROM POST_COMMENTS 
				WHERE body = ${body} && 
					post_id=${req.params.post_id} && 
					user_id=${req.user.id};
    	`;

		db.query(query, (err, results) => {
			if (err) return next(err);

			if (results[0].duplicateComment > 0) {
				return next(
					new ErrorResponse('This comment is already exists for this post commented by you', 400)
				);
			}

			// Call Add Comments Service
			addComment(
				{
					body,
					user: req.user,
					post_id: req.params.post_id,
				},
				res,
				next
			);
		});
	});
};

exports.updateCommentHandler = (req, res, next) => {
	// Checking for body
	let { body } = req.body;
	if (!body || body.trim().length === 0)
		return next(new ErrorResponse('Please add some texts to update your comment', 400));

	// Filter the body for XSS Protection
	body = xss(body);

	// Checking For Duplicates
	let query = `
        SELECT id as comment_id 
			FROM POST_COMMENTS 
			WHERE body = '${body}' && 
				user_id=${req.user.id} &&
				post_id=${req.params.post_id};
    `;

	db.query(query, (err, results) => {
		if (err) return next(err);

		// Duplicate checking
		if (results.length > 0 && results[0].comment_id !== req.post_comment.id) {
			return next(
				new ErrorResponse('This comment is already exists for this post commented by you', 400)
			);
		}

		// Call Add Post Service
		updateComment(
			{
				body,
				comment: req.post_comment,
			},
			res,
			next
		);
	});
};

exports.deleteCommentHandler = (req, res, next) => {
	// Checking For Duplicates
	let query = `
        DELETE FROM POST_COMMENTS
			WHERE id = '${req.post_comment.id}' && 
				user_id=${req.user.id} &&
				post_id=${req.params.post_id};
    `;

	db.query(query, (err, results) => {
		if (err) return next(err);

		// Send responses to client
		res.status(201).json({
			success: true,
			message: 'Your comment deleted successfully',
		});
	});
};

exports.reactionHandler = (req, res, next) => {
	// Checking For Duplicates
	let query = `
        SELECT COUNT(id) as postCount 
			FROM POSTS 
			WHERE id = '${req.params.post_id}';
    `;

	db.query(query, (err, results) => {
		if (err) return next(err);

		if (results[0].postCount === 0) {
			return next(new ErrorResponse('Oops! requested post not found', 400));
		}

		// check for reactions
		query = `
			SELECT reaction
				FROM POST_REACTIONS
				WHERE post_id = ${req.params.post_id} &&
					user_id = ${req.user.id};
		`;

		if (req.body && typeof req.body.reaction !== 'boolean')
			return next(new ErrorResponse('Invalid reaction type', 400));

		let currentReaction = req.body.reaction ? 1 : 0;

		db.query(query, (err, results) => {
			if (err) return next(err);

			if (results.length === 0) {
				// add new reaction
				addReaction(currentReaction, req.params.post_id, req.user.id, res, next);
			} else if (results[0].reaction === currentReaction) {
				// delete
				deleteReaction(req.params.post_id, req.user.id, res, next);
			} else {
				// update
				updateReaction(currentReaction, req.params.post_id, req.user.id, res, next);
			}
		});
	});
};

exports.getPostsHandler = (req, res, next) => {
	let requestedUserID = req.user ? req.user.id : null;

	let query = `
		SELECT 
			concat(substr(p.body, 1, 300), "....") as body, 
			p.id, p.user_id as author_id, p.created_at, 
			up.profile_image_url as author_dp_url, 
			u.avatar_colour_code as author_avatar_color, 
			u.name as author_name, max(r.reaction) as reaction,
			count(c.id) as comments
			FROM POSTS p
			INNER JOIN USER_PROFILES up ON p.user_id = up.user_id
			INNER JOIN USERS u ON u.id = p.user_id
			LEFT JOIN POST_COMMENTS c ON c.post_id = p.id
			LEFT JOIN POST_REACTIONS r ON r.post_id = p.id && r.user_id = ${requestedUserID}
			GROUP BY p.id
			ORDER BY p.created_at DESC;
		`;

	db.query(query, (err, results) => {
		if (err) return next(err);

		// Send responses to client
		res.status(200).json({
			success: true,
			results: results,
		});
	});
};

exports.getSinglePostHandler = (req, res, next) => {
	let requestedUserID = req.user ? req.user.id : null;

	if (!checker.numeric(req.params.post_id))
		return next(new ErrorResponse('Not found any posts with given arguments on our records', 404));

	let query = `
			SELECT 
				p.body, 
				p.id, p.user_id as author_id, p.created_at, 
				up.profile_image_url as author_dp_url, 
				u.avatar_colour_code as author_avatar_color, 
				u.name as author_name, max(r.reaction) as reaction
			FROM POSTS p
			INNER JOIN USER_PROFILES up ON p.user_id = up.user_id
			INNER JOIN USERS u ON u.id = p.user_id
			LEFT JOIN POST_REACTIONS r ON r.post_id = p.id && r.user_id = ${requestedUserID}
			WHERE p.id = ${req.params.post_id}
			GROUP BY p.id;
			SELECT
				c.body, c.created_at, c.id, c.user_id as author_id,
				up.profile_image_url as author_dp_url, 
				u.avatar_colour_code as author_avatar_color, 
				u.name as author_name
			FROM POST_COMMENTS c
			INNER JOIN USER_PROFILES up ON c.user_id = up.user_id
			INNER JOIN USERS u ON u.id = c.user_id
			WHERE c.post_id = ${req.params.post_id}
			ORDER BY c.created_at DESC;
		`;

	// execute the query
	db.query(query, (err, result) => {
		if (err) return next(err);

		// Send responses to client
		res.status(result[0][0] ? 200 : 404).json({
			success: result[0][0] ? true : false,
			message: result[0][0] ? undefined : 'Not found any posts with given arguments on our records',
			results: result[0][0] ? { post: result[0][0], comments: result[1] || [] } : undefined,
		});
	});
};
