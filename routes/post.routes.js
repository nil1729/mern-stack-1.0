const express = require('express'),
	router = express.Router({ mergeParams: true }),
	{
		getPostsHandler,
		addPostHandler,
		updatePostHandler,
		deletePostHandler,
		addCommentHandler,
		updateCommentHandler,
		deleteCommentHandler,
		reactionHandler,
		getSinglePostHandler,
	} = require('../controllers/post.controllers'),
	{
		checkAuthentication,
		postAuthorize,
		postCommentAuthorize,
	} = require('../middleware/auth.middleware');

router
	.route('/')
	.get(checkAuthentication, getPostsHandler)
	.post(checkAuthentication, addPostHandler);

router
	.route('/:post_id')
	.get(checkAuthentication, getSinglePostHandler)
	.put(checkAuthentication, postAuthorize, updatePostHandler)
	.delete(checkAuthentication, postAuthorize, deletePostHandler);

router.route('/:post_id/comments').post(checkAuthentication, addCommentHandler);

router
	.route('/:post_id/comments/:comment_id')
	.put(checkAuthentication, postCommentAuthorize, updateCommentHandler)
	.delete(checkAuthentication, postCommentAuthorize, deleteCommentHandler);

router.route('/:post_id/reactions').post(checkAuthentication, reactionHandler);

module.exports = router;
