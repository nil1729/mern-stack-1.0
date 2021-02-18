const express = require('express'),
	router = express.Router({ mergeParams: true }),
	{
		profileHandler,
		addExperience,
		experienceHandler,
		addEducation,
		educationHandler,
	} = require('../controllers/profile.controllers'),
	{
		checkAuthentication,
		experienceAuthorize,
		educationAuthorize,
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

router.route('/education').post(checkAuthentication, addEducation);
router
	.route('/education/:edu_id')
	.put(checkAuthentication, educationAuthorize, educationHandler)
	.delete(checkAuthentication, educationAuthorize, educationHandler);

module.exports = router;
