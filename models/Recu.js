var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var RecuSchema = new Schema({
	reference: {
		type: String,
		require: true,
	},
	remise: {
		type: Number,
		require: false,
	},
	totalRecu: {
		type: Number,
		require: true,
	},
	panier_id: {
		type: ObjectId,
		ref: 'Panier',
		require: true,
	}
},
{
	timestamps: true
});

module.exports = mongoose.model('Recu', RecuSchema);