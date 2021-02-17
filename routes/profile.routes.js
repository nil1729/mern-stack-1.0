const express = require('express'),
	router = express.Router({ mergeParams: true }),
	{
		profileHandler,
		addExperience,
	} = require('../controllers/profile.controllers'),
	{ checkAuthentication } = require('../middleware/auth.middleware');

router
	.route('/')
	.get(checkAuthentication, profileHandler)
	.post(checkAuthentication, profileHandler)
	.put(checkAuthentication, profileHandler);

router.route('/experience').post(checkAuthentication, addExperience);

module.exports = router;
