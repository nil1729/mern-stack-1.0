const express = require('express'),
	router = express.Router(),
	{ profileHandler } = require('../controllers/profile.controllers'),
	{ checkAuthentication } = require('../middleware/auth.middleware');

router.get('/', checkAuthentication, (req, res, next) => {
	let queryFields = ``;
	[
		'name',
		'profile_image_url',
		'skills',
		'current_working_place_name',
		'current_position',
		'avatar_colour_code',
		'user_id',
		'username',
	].forEach((field) => (queryFields += `${field},`));
	queryFields = queryFields.slice(0, -1);
	if (req.user) queryFields += ',location';

	let query = `
        SELECT ${queryFields}
            FROM USERS u
			INNER JOIN USER_PROFILES up ON u.id = up.user_id
			ORDER BY up.created_at desc;
    `;

	db.query(query, (err, results) => {
		if (err) return next(err);

		// Send responses to client
		res.status(200).json({
			success: true,
			results: results,
		});
	});
});

router.get('/:username', checkAuthentication, profileHandler);

module.exports = router;
