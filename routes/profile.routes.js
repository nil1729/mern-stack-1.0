const express = require('express'),
	router = express.Router({ mergeParams: true }),
	{
		profileHandler,
		addExperience,
		experienceHandler,
	} = require('../controllers/profile.controllers'),
	{
		checkAuthentication,
		experienceAuthorize,
	} = require('../middleware/auth.middleware');

router
	.route('/')
	.get(checkAuthentication, profileHandler)
	.post(checkAuthentication, profileHandler)
	.put(checkAuthentication, profileHandler);

router.route('/experience').post(checkAuthentication, addExperience);
router
	.route('/experience/:exp_id')
	.put(checkAuthentication, experienceAuthorize, experienceHandler)
	.delete(checkAuthentication, experienceAuthorize, experienceHandler);

module.exports = router;
