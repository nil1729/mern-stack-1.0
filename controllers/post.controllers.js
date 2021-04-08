const ErrorResponse = require('../utils/errorResponse'),
	checker = require('../utils/checkFields'),
	xss = require('xss'),
	{
		addPost,
		updatePost,
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
		return next(
			new ErrorResponse(
				'Please add some texts to create a new post',
				400
			)
		);

	// Filter the body for XSS Protection
	body = xss(body);

	// Checking For Duplicates
	let query = `
        SELECT COUNT(*) as duplicatePost FROM POSTS WHERE body = '${body}' && user_id=${req.user.id};
    `;

	db.query(query, (err, results) => {
		if (err) return next(err);

		if (results[0].duplicatePost > 0) {
			return next(
				new ErrorResponse(
					'The Post you trying to add is already exists',
					400
				)
			);
		}

		// Call Add Post Service
		addPost({ body, user: req.user }, res, next);
	});
};

exports.updatePostHandler = (req, res, next) => {
	// Checking for body
	let { body } = req.body;
	if (!body || body.trim().length === 0)
		return next(
			new ErrorResponse(
				'Please add some texts to update the post',
				400
			)
		);

	// Filter the body for XSS Protection
	body = xss(body);

	// Checking For Duplicates
	let query = `
        SELECT id as post_id FROM POSTS WHERE body = '${body}' && user_id=${req.user.id};
    `;

	db.query(query, (err, results) => {
		if (err) return next(err);

		// Duplicate checking
		if (
			results.length > 0 &&
			results[0].post_id !== req.post.id
		) {
			return next(
				new ErrorResponse(
					'The Post you trying to add is already exists',
					400
				)
			);
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
	// Checking For Duplicates
	let query = `
        DELETE FROM POSTS WHERE id = '${req.post.id}' && user_id=${req.user.id};
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
