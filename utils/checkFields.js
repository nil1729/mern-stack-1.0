const validator = require('validator');
class checker {
	constructor() {}
	alphabetic(word) {
		if (word && validator.matches(word, /^[A-Za-z\s]+$/)) return true;
		return false;
	}
	email(email) {
		if (email && validator.isEmail(email)) return true;
		return false;
	}
	password(password) {
		if (password && validator.isStrongPassword(password)) return true;
		return false;
	}
}

module.exports = new checker();
