var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({
	email: {type: String, index: 1, unique: true, required: true},
	age: Number,
	status: Number,
	name: String,
	left: Number,
	top: Number,
	lstop: String,
	ttime: Number,
	carrige: Number,
	img: String

	}, {collection: 'user'});

exports.userSchema = userSchema;