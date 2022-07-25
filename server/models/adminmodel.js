const mongoose = require('mongoose');

const adminschema = mongoose.Schema({
	email: {
		type: String,
	},
	name: {
		type: String,
	},
	password: {
		type: String,
	},
	role: {
		type: String,
		default: 'user',
	},
	timestamp: {
		type: Date,
		default: Date.now(),
	},

});

const AdminModel = mongoose.model('Admin', adminschema);

module.exports = {
	AdminModel,
};
