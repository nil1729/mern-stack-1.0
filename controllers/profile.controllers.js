const asyncHandler = require('../middleware/asyncHandler'),
	ErrorResponse = require('../utils/errorResponse'),
	checker = require('../utils/checkFields'),
	xss = require('xss'),
	{
		createProfile,
		updateProfile,
		getProfile,
	} = require('../services/profile.services');

/**
 *
 * @desc User Profile edit/create/get Handler
 * @route /api/v1/user/:id/profile
 * @access private
 *
 */

exports.profileHandler = (req, res, next) => {
	if (req.method === 'POST' && req.user.new_account) {
		let requiredFields = [
			'current_position',
			'current_working_place_name',
			'skills',
		];
		let incomingFields = Object.keys(req.body);
		let errors = [];

		for (let i = 0; i < requiredFields.length; i++) {
			if (
				!req.body[requiredFields[i]] ||
				(req.body[requiredFields[i]] &&
					req.body[requiredFields[i]].trim().length === 0)
			)
				return next(new ErrorResponse('Please add all required fields', 400));
		}
		for (let i = 0; i < incomingFields.length; i++) {
			if (
				incomingFields[i].endsWith('_url') &&
				!checker.siteURL(req.body[incomingFields[i]])
			) {
				errors.push(`${incomingFields[i]} is not a valid URL`);
			}
		}
		if (errors.length > 0)
			next(new ErrorResponse('Please provide valid URL(s)', 400, errors));

		if (req.body.bio) req.body.bio = xss(req.body.bio);

		// proceed further
		let data = {
			incomingFields,
			body: req.body,
			user: req.user,
		};

		// Call create profile service
		createProfile(data, res, next);
	} else if (req.method === 'GET') {
		let privateFields = [
			'email_address',
			'linkedin_url',
			'instagram_url',
			'facebook_url',
			'location',
		];
		let publicFields = [
			'name',
			'username',
			'users.id',
			'current_position',
			'current_working_place_name',
			'skills',
			'github_username',
			'bio',
			'website_url',
			'twitter_url',
			'youtube_channel_url',
		];
		if (req.user) publicFields.push(...privateFields);
		getProfile(req.params.user_id, publicFields, res, next);
	} else if (req.method === 'PUT' && !req.user.new_account) {
		let requiredFields = [
			'current_position',
			'current_working_place_name',
			'skills',
		];
		let incomingFields = Object.keys(req.body);
		let errors = [];

		if (incomingFields.length === 0)
			next(new ErrorResponse(`Invalid request for update profile`, 403));

		for (let i = 0; i < incomingFields.length; i++) {
			// Check if update any required fields to be updated correctly
			if (
				requiredFields.includes[incomingFields[i]] &&
				(!req.body[requiredFields[i]] ||
					(req.body[requiredFields[i]] &&
						req.body[requiredFields[i]].trim().length === 0))
			)
				return next(new ErrorResponse('Please add all required fields', 400));

			// Checking for URL updates
			if (
				incomingFields[i].endsWith('_url') &&
				!checker.siteURL(req.body[incomingFields[i]])
			) {
				errors.push(`${incomingFields[i]} is not a valid URL`);
			}
		}
		if (errors.length > 0)
			next(new ErrorResponse('Please provide valid URL(s)', 400, errors));

		if (req.body.bio) req.body.bio = xss(req.body.bio);

		// proceed further
		let data = {
			incomingFields,
			body: req.body,
			user: req.user,
		};

		// call update profile service
		updateProfile(data, res, next);
	} else
		next(new ErrorResponse('Requested address not found on this server', 400));
};
