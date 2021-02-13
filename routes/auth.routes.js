const express = require('express'),
	router = express.Router(),
	{ registerHandler } = require('../controllers/auth.controllers');

router.route('/register').post(registerHandler);

module.exports = router;
