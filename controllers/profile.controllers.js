const asyncHandler = require('../middleware/asyncHandler'),
	ErrorResponse = require('../utils/errorResponse'),
	checker = require('../utils/checkFields'),
	xss = require('xss'),
	{
		createProfile,
		updateProfile,
		getProfile,
		addExperience,
		updateExperience,
		deleteExperience,
	} = require('../services/profile.services');

/**
 *
 * @desc User Profile edit/create/get Handler
 * @route /api/v1/user/:id/profile
 * @access private (public for GET request)
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
		let privateUserFields = [
			'email_address',
			'linkedin_url',
			'instagram_url',
			'facebook_url',
			'location',
		];
		let publicUserFields = [
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
		let privateJobFields = [
			'location',
			'job_description',
			'starting_date',
			'ending_date',
		];
		let publicJobFields = ['job_title', 'company_name'];

		// If user is authenticated make all fields public
		if (req.user) {
			publicUserFields.push(...privateUserFields);
			publicJobFields.push(...privateJobFields);
		}
		// Call Get profile Service
		getProfile(
			req.params.user_id,
			{ publicUserFields, publicJobFields },
			res,
			next
		);
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
				requiredFields.includes(incomingFields[i]) &&
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

/**
 *
 * @desc User experience add Handler
 * @route /api/v1/user/:id/profile/experience
 * @access private
 *
 */

exports.addExperience = (req, res, next) => {
	// If new user directly reject
	if (req.user.new_account)
		return next(
			new ErrorResponse('Please first create your developer profile', 403)
		);

	let requiredFields = ['job_title', 'company_name'];
	let incomingFields = Object.keys(req.body);
	let errors = [];

	// Checking for required fields
	for (let i = 0; i < requiredFields.length; i++) {
		if (
			!req.body[requiredFields[i]] ||
			(req.body[requiredFields[i]] &&
				req.body[requiredFields[i]].trim().length === 0)
		)
			return next(new ErrorResponse('Please add all required fields', 400));
	}

	// Checking for starting_date and ending_date
	let { starting_date, ending_date } = req.body;
	if (starting_date) {
		if (!checker.checkDate(starting_date, 'smaller', new Date()))
			errors.push('Please correctly mention the starting_date');
	}
	if (ending_date) {
		if (!checker.checkDate(ending_date, 'greater', starting_date))
			errors.push('Please correctly mention the ending_date');
	}
	if (errors.length > 0)
		next(new ErrorResponse('Please provide valid Date(s)', 400, errors));

	// if job description added
	if (req.body.job_description)
		req.body.job_description = xss(req.body.job_description);

	// proceed further
	let data = {
		incomingFields,
		body: req.body,
		user: req.user,
	};

	// call add experience service
	addExperience(data, res, next);
};

exports.experienceHandler = (req, res, next) => {
	if (req.method === 'PUT') {
		let requiredFields = ['job_title', 'company_name'];
		let incomingFields = Object.keys(req.body);
		let errors = [];

		if (incomingFields.length === 0)
			next(new ErrorResponse(`Invalid request for update job experience`, 403));

		for (let i = 0; i < incomingFields.length; i++) {
			// Check if update any required fields to be updated correctly
			if (
				requiredFields.includes(incomingFields[i]) &&
				(!req.body[requiredFields[i]] ||
					(req.body[requiredFields[i]] &&
						req.body[requiredFields[i]].trim().length === 0))
			)
				return next(
					new ErrorResponse('Please add all required fields correctly', 400)
				);
		}
		// Checking for starting_date and ending_date
		let { starting_date, ending_date } = req.body;
		if (starting_date) {
			if (!checker.checkDate(starting_date, 'smaller', new Date()))
				errors.push('Please correctly mention the starting_date');
			if (ending_date) {
				if (!checker.checkDate(ending_date, 'greater', starting_date))
					errors.push('Please correctly mention the ending_date');
			}
		} else if (ending_date) {
			if (!checker.checkDate(ending_date, 'greater', req.job_exp.starting_date))
				errors.push('Please correctly mention the ending_date');
		}

		if (errors.length > 0)
			next(new ErrorResponse('Please provide valid Date(s)', 400, errors));

		// if job description added
		if (req.body.job_description)
			req.body.job_description = xss(req.body.job_description);

		// proceed further
		let data = {
			incomingFields,
			body: req.body,
			user: req.user,
			job_exp: req.job_exp,
		};

		// call update Job Experience service
		updateExperience(data, res, next);
	} else if (req.method === 'DELETE')
		deleteExperience(req.user.id, req.job_exp.id, res, next);
	else
		next(new ErrorResponse('Requested address not found on this server', 400));
};