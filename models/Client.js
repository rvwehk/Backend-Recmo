var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
	nom: {
		type: String,
		require: true,
	},
	prenom: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
		require: true,
		unique: true,
		lowercase: true,
		trim:true
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

ClientSchema.pre('save',  function(next) {
    var client = this;
 
     if (!client.isModified('password')) return next();
 
     bcrypt.genSalt(10, function(err, salt) {
         if (err) return next(err);
 
         bcrypt.hash(client.password, salt, function(err, hash) {
             if (err) return next(err);
 
             client.password = hash;
             next();
         });
     });
});
 
ClientSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Client', ClientSchema);