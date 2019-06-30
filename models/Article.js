var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var ProduitSchema = new Schema({
	libelle: {
		type: String,
		require: true,
	},
	prix: {
		type: String,
		require: true,
	},
	remise: {
		type: Number,
		require: false,
	},
	stock: {
		type: String,
		require: false,
	},
	user_id: {
		type: ObjectId,
		ref: 'User',
		require: true,
	}
},
{
	timestamps: true
});

module.exports = mongoose.model('Article', ProduitSchema);