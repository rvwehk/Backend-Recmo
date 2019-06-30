var Contact = require('../models/Contact');
var User = require('../models/User');

module.exports = {
	create: function(req, res){
		// Validate request
    if(!req.body.me_id || !req.body.you_id) {
        return res.status(400).send({
            message: "Tous les champs doivent etre remplis"
        });
    }

    // Create a Note
    const contact = new Contact({
        me_id: req.body.me_id,
        you_id: req.body.you_id
    });

    // Save Product in the database
    contact.save()
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
		User.find()
		.then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });	
	},

	read: function(req, res){
	Contact.find({me_id:req.params.id})
    .populate('you_id')
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "Contact not found with id " + req.params.id
            });            
        }
        res.send(contact);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Contact not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving contact with id " + req.params.id
        });
    });
	},

	// update: function(req, res){
	// 	// Validate Request
 //    if(!req.body.email) {
 //        return res.status(400).send({
 //            message: "Contact email can not be empty"
 //        });
 //    }

 //    // Find contact and update it with the request body
 //    Contact.findByIdAndUpdate(req.params.id, {
 //        email: req.body.email,
 //        password: req.body.password,
 //        tel: req.body.tel,
 //        adresse: req.body.adresse,
 //        avatar: req.body.avatar,
        
 //    }, {new: true})
 //    .then(contact => {
 //        if(!contact) {
 //            return res.status(404).send({
 //                message: "Contact not found with id " + req.params.id
 //            });
 //        }
 //        res.send(contact);
 //    }).catch(err => {
 //        if(err.kind === 'ObjectId') {
 //            return res.status(404).send({
 //                message: "Contact not found with id " + req.params.id
 //            });                
 //        }
 //        return res.status(500).send({
 //            message: "Error updating contact with id " + req.params.id
 //        });
 //    });
	// },

	delete: function(req, res){
		Contact.findByIdAndRemove(req.params.id)
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "Contact not found with id " + req.params.id
            });
        }
        res.send({message: "Contact deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Contact not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete contact with id " + req.params.id
        });
    });
	}
}

