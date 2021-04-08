const express = require('express'),
	router = express.Router({ mergeParams: true }),
	{
		addPostHandler,
		updatePostHandler,
		deletePostHandler,
		addCommentHandler,
		updateCommentHandler,
		deleteCommentHandler,
		reactionHandler,
	} = require('../controllers/post.controllers'),
	{
		checkAuthentication,
		postAuthorize,
		postCommentAuthorize,
	} = require('../middleware/auth.middleware');

router
	.route('/')
	.post(checkAuthentication, addPostHandler);

router
	.route('/:post_id')
	.put(
		checkAuthentication,
		postAuthorize,
		updatePostHandler
	)
	.delete(
		checkAuthentication,
		postAuthorize,
		deletePostHandler
	);

router
	.route('/:post_id/comments')
	.post(checkAuthentication, addCommentHandler);

router
	.route('/:post_id/comments/:comment_id')
	.put(
		checkAuthentication,
		postCommentAuthorize,
		updateCommentHandler
	)
	.delete(
		checkAuthentication,
		postCommentAuthorize,
		deleteCommentHandler
	);

router
	.route('/:post_id/reactions')
	.post(checkAuthentication, reactionHandler);

module.exports = router;
