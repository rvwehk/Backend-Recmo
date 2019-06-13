var Panier = require('../models/Panier');

module.exports = {
	create: function(req, res){
		// Validate request
    if(!req.body.marchand_id || !req.body.client_id || !req.body.totalPanier || !req.body.achat) {
        return res.status(400).send({
            message: "Tous les champs doivent etre remplis"
        });
    }

    // Create a Note
    const panier = new Panier({
        client_id: req.body.client_id, 
        achat: req.body.achat,
        totalPanier: req.body.totalPanier,
        marchand_id: req.body.marchand_id
    });

    // Save Product in the database
    panier.save()
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
		Panier.find()
        .populate('marchand_id')
        .populate('client_id')
		.then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });	
	},

	read: function(req, res){
		Panier.findById(req.params.id)
    .then(panier => {
        if(!panier) {
            return res.status(404).send({
                message: "Panier not found with id " + req.params.id
            });            
        }
        res.send(panier);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Panier not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving panier with id " + req.params.id
        });
    });
	},

	// update: function(req, res){
	// 	// Validate Request
 //    if(!req.body.libelle) {
 //        return res.status(400).send({
 //            message: "Panier libelle can not be empty"
 //        });
 //    }

 //    // Find panier and update it with the request body
 //    Panier.findByIdAndUpdate(req.params.id, {
 //        achat: req.body.achat,
 //        totalPanier: req.body.totalPanier,
 //        client_id: req.body.client_id,
 //        marchand_id: req.body.marchand_id
 //    }, {new: true})
 //    .then(panier => {
 //        if(!panier) {
 //            return res.status(404).send({
 //                message: "Panier not found with id " + req.params.id
 //            });
 //        }
 //        res.send(panier);
 //    }).catch(err => {
 //        if(err.kind === 'ObjectId') {
 //            return res.status(404).send({
 //                message: "Panier not found with id " + req.params.id
 //            });                
 //        }
 //        return res.status(500).send({
 //            message: "Error updating panier with id " + req.params.id
 //        });
 //    });
	// },

	delete: function(req, res){
		Panier.findByIdAndRemove(req.params.id)
    .then(panier => {
        if(!panier) {
            return res.status(404).send({
                message: "Panier not found with id " + req.params.id
            });
        }
        res.send({message: "Panier deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Panier not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete panier with id " + req.params.id
        });
    });
	}
}
