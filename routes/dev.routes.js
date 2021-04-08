const express = require('express'),
	router = express.Router(),
	{ checkAuthentication } = require('../middleware/auth.middleware');

router.get('/', checkAuthentication, (req, res, next) => {
	let queryFields = ``;
	['name', 'github_username', 'skills', 'current_working_place_name', 'current_position'].forEach(
		(field) => (queryFields += `${field},`)
	);
	queryFields = queryFields.slice(0, -1);
	if (req.user) queryFields += ',location';

	let query = `
        select ${queryFields}
            from users u
            inner join user_profiles up on u.id = up.user_id;
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

module.exports = router;
