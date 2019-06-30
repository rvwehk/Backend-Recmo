var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var PanierSchema = new Schema({
	client_id: {
		type: ObjectId,
		ref: 'User',
		require: true,
	},
	marchand_id: {
		type: ObjectId,
		ref: 'User',
		require: true,
	},
	totalPanier: {
		type: Number,
		require: true,
	},
	achat: {
		type: Array,
		require: true,
	}
},
{
	timestamps: true
});

module.exports = mongoose.model('Panier', PanierSchema);