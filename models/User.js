var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = mongoose.Schema({
		first_name: String,
		last_name: String,
		email: String,
		password: String,
    	disable : Boolean,
		token: String,
		isAdmin : Boolean,
		isKine : Boolean,
		isPatient : Boolean,
		isSuperAdmin : Boolean,
		canRead : Boolean,
		canWrite : Boolean,
		canUpdate : Boolean
});

var User = module.exports = mongoose.model('User', UserSchema);
