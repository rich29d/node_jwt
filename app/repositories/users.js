const bcrypt = require('bcrypt');

const { users } = require("../models");

exports.show = async (where) => {
	if (!where) {
		return null;
	}
	
	return await users.findOne(where);
};

exports.showByEmail = async (email) => {
	if (!email) {
		return null;
	}
	
	return await users.findOne({email});
};

exports.comparePasswords = async (password1, password2) => {
	if (!password1 || !password2) {
		return false;
	}
	
	return bcrypt.compare(password1, password2);
};
