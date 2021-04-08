const express = require('express'),
	router = express.Router({ mergeParams: true }),
	{
		addPostHandler,
		updatePostHandler,
		deletePostHandler,
	} = require('../controllers/post.controllers'),
	{
		checkAuthentication,
		postAuthorize,
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

module.exports = router;
