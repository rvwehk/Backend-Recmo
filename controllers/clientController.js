var Client = require('../models/Client');

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

	readAll: function(req, res){
		// Find all product
		Client.find()
		.then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });	
	},

	read: function(req, res){
		Client.findById(req.params.id)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.id
            });            
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving client with id " + req.params.id
        });
    });
	},

	update: function(req, res){
		// Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Client email can not be empty"
        });
    }

    // Find client and update it with the request body
    Client.findByIdAndUpdate(req.params.id, {
        email: req.body.email,
        password: req.body.password,
        tel: req.body.tel,
        adresse: req.body.adresse,
        avatar: req.body.avatar,
        
    }, {new: true})
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.id
            });
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating client with id " + req.params.id
        });
    });
	},

	delete: function(req, res){
		Client.findByIdAndRemove(req.params.id)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.id
            });
        }
        res.send({message: "Client deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete client with id " + req.params.id
        });
    });
	}
}

