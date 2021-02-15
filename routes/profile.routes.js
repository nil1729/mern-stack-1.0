const express = require('express'),
	router = express.Router({ mergeParams: true }),
	{ profileHandler } = require('../controllers/profile.controllers'),
	{ checkAuthentication } = require('../middleware/auth.middleware');

router
	.route('/profile')
	.get(checkAuthentication, profileHandler)
	.post(checkAuthentication, profileHandler)
	.put(checkAuthentication, profileHandler);

module.exports = router;
