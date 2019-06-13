var Marchand = require('../models/Marchand');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

function createToken(marchand) {
    return jwt.sign({ id: marchand.id, email: marchand.email }, config.jwtSecret, {
        expiresIn: 86400 // 86400 expires in 24 hours
      });
}

module.exports = {
	// create: function(req, res){
	// 	// Validate request
 //    if(!req.body.libelle || !req.body.prix || !req.body.marchand_id) {
 //        return res.status(400).send({
 //            message: "Tous les champs doivent etre remplis"
 //        });
 //    }

 //    // Create a Note
 //    const client = new Client({
 //        libelle: req.body.libelle, 
 //        prix: req.body.prix,
 //        stock: req.body.stock,
 //        remise: req.body.remise,
 //        marchand_id: req.body.marchand_id
 //    });

 //    // Save Product in the database
 //    client.save()
 //    .then(data => {
 //        res.send(data);
 //    }).catch(err => {
 //        res.status(500).send({
 //            message: err.message || "Some error occurred while creating the User."
 //        });
 //    });	
	// },

    register: function(req, res){
        if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'Veuillez entrer votre email et mot de passe' });
        }
 
        Marchand.findOne({ email: req.body.email }, (err, marchand) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
     
            if (marchand) {
                return res.status(400).json({ 'msg': 'Ce compte existe dejà' });
            }
     
            let newMarchand = Marchand(req.body);
            newMarchand.save((err, marchand) => {
                if (err) {
                    return res.status(400).json({ 'msg': err });
                }
                return res.status(201).json(marchand);
            });
        });
    },

    login: function(req, res){
        if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'Veuillez entrer votre email et mot de passe' });
        }
     
        Marchand.findOne({ email: req.body.email }, (err, marchand) => {
            if (err) {
                return res.status(400).send({ 'msg': err });
            }
     
            if (!marchand) {
                return res.status(400).json({ 'msg': 'Ce compte n\'existe pas' });
            }
     
            marchand.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    return res.status(200).json({
                        token: createToken(marchand),
                        user: marchand
                    });
                } else {
                    return res.status(400).json({ msg: 'L\'email et le mot de passe ne correspondent pas.' });
                }
            });
        });
    },

	readAll: function(req, res){
		// Find all product
		Marchand.find()
		.then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while finding the User."
        });
    });	
	},

	read: function(req, res){
		Marchand.findById(req.params.id)
    .then(marchand => {
        if(!marchand) {
            return res.status(404).send({
                message: "Marchand not found with id " + req.params.id
            });            
        }
        res.send(marchand);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Marchand not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving marchand with id " + req.params.id
        });
    });
	},

	update: function(req, res){
		// Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Marchand email can not be empty"
        });
    }

    // Find marchand and update it with the request body
    Marchand.findByIdAndUpdate(req.params.id, {
        email: req.body.email,
        password: req.body.password,
        tel: req.body.tel,
        adresse: req.body.adresse,
        avatar: req.body.avatar,
        
    }, {new: true})
    .then(marchand => {
        if(!marchand) {
            return res.status(404).send({
                message: "Marchand not found with id " + req.params.id
            });
        }
        res.send(marchand);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Marchand not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating marchand with id " + req.params.id
        });
    });
	},

	delete: function(req, res){
		Marchand.findByIdAndRemove(req.params.id)
    .then(marchand => {
        if(!marchand) {
            return res.status(404).send({
                message: "Marchand not found with id " + req.params.id
            });
        }
        res.send({message: "Marchand deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Marchand not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete marchand with id " + req.params.id
        });
    });
	}
}

