var Recu = require('../models/Recu');

module.exports = {
	create: function(req, res){
		// Validate request
    if(!req.body.panier_id || !req.body.reference || !req.body.totalRecu) {
        return res.status(400).send({
            message: "Tous les champs doivent etre remplis"
        });
    }

    // Create a Note
    const recu = new Recu({
        client_id: req.body.client_id, 
        achat: req.body.achat,
        totalPanier: req.body.totalPanier,
        marchand_id: req.body.marchand_id
    });

    // Save Product in the database
    recu.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });	
	},

	readAll: function(req, res){
		// Find all product
		Recu.find()
		.then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });	
	},

	read: function(req, res){
		Recu.findById(req.params.id)
    .then(recu => {
        if(!recu) {
            return res.status(404).send({
                message: "Recu not found with id " + req.params.id
            });            
        }
        res.send(recu);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Recu not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving recu with id " + req.params.id
        });
    });
	},

	// update: function(req, res){
	// 	// Validate Request
 //    if(!req.body.libelle) {
 //        return res.status(400).send({
 //            message: "Recu libelle can not be empty"
 //        });
 //    }

 //    // Find recu and update it with the request body
 //    Recu.findByIdAndUpdate(req.params.id, {
 //        achat: req.body.achat,
 //        totalPanier: req.body.totalPanier,
 //        client_id: req.body.client_id,
 //        marchand_id: req.body.marchand_id
 //    }, {new: true})
 //    .then(recu => {
 //        if(!recu) {
 //            return res.status(404).send({
 //                message: "Recu not found with id " + req.params.id
 //            });
 //        }
 //        res.send(recu);
 //    }).catch(err => {
 //        if(err.kind === 'ObjectId') {
 //            return res.status(404).send({
 //                message: "Recu not found with id " + req.params.id
 //            });                
 //        }
 //        return res.status(500).send({
 //            message: "Error updating recu with id " + req.params.id
 //        });
 //    });
	// },

	delete: function(req, res){
		Recu.findByIdAndRemove(req.params.id)
    .then(recu => {
        if(!recu) {
            return res.status(404).send({
                message: "Recu not found with id " + req.params.id
            });
        }
        res.send({message: "Recu deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Recu not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete recu with id " + req.params.id
        });
    });
	}
}
