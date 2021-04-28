import validator from 'validator';
class checker {
	alphabetic(word) {
		if (word && validator.isAlpha(word)) return true;
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
	siteURL(url) {
		if (url && validator.isURL(url)) return true;
		return false;
	}
	checkDate(...args) {
		let dateToBeCheck = args[0];
		let paramForDate = args[1];
		let relDate = args[2];
		if (!dateToBeCheck || !validator.isDate(dateToBeCheck)) return false;

		if (paramForDate) {
			switch (paramForDate) {
				case 'smaller':
					if (new Date(dateToBeCheck) < new Date(relDate)) return true;
					else return false;
				case 'greater':
					if (new Date(dateToBeCheck) > new Date(relDate)) return true;
					else return false;
				default:
					return false;
			}
		}
	}
}

export default new checker();
