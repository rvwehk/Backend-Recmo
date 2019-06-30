var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var ContactSchema = new Schema({
	me_id: {
		type: ObjectId,
		ref: 'User',
		require: true,
	},
	you_id: {
		type: ObjectId,
		ref: 'User',
		require: true,
	},
},
{
	timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);