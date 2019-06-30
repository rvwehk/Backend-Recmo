var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var MarchandSchema = new Schema({
	nom: {
		type: String,
		require: false,
	},
	prenom: {
		type: String,
		require: false,
	},
	raisonSocial: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
		lowercase: true,
		trim:true
	},
	password: {
		type: String,
		require: true,
	},
	adresse: {
		type: String,
		require: false,
	},
	tel: {
		type: String,
		require: false,
	},
	avatar: {
		type: String,
		require: false,
	}
},
{
	timestamps: true
});

MarchandSchema.pre('save',  function(next) {
    var marchand = this;
     if (!marchand.isModified('password')) return next();
 	
     bcrypt.genSalt(10, function(err, salt) {
         if (err) return next(err);
 
         bcrypt.hash(marchand.password, salt, function(err, hash) {
             if (err) return next(err);
             marchand.password = hash;
             next();
         });
     });
});
 
MarchandSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Marchand', MarchandSchema);