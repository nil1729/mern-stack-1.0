const express = require('express'),
	router = express.Router(),
	{ registerHandler, loginHandler, userHandler } = require('../controllers/auth.controllers'),
	{ checkAuthentication } = require('../middleware/auth.middleware');

router.route('/register').post(registerHandler);
router.route('/login').post(loginHandler);
router.route('/user').get(checkAuthentication, userHandler);

module.exports = router;
