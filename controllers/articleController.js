var Article = require('../models/Article');

module.exports = {

	create: function(req, res){
		// Validate request
    if(!req.body.libelle || !req.body.prix) {
        return res.status(400).send({
            message: "Tous les champs doivent etre remplis"
        });
    }
    

    // Créer un article
    const article = new Article({
        libelle: req.body.libelle, 
        prix: req.body.prix,
        stock: req.body.stock || 0,
        remise: req.body.remise || 0,
        user_id: req.body.user_id || '5ccb043fd33bd539b19615a9'
    });

    // Enregister l'article dans la base de donnée
    article.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la creation de l'article."
        });
    });	
	},

	readAll: function(req, res){
		// Find all product
		Article.find()
		.then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la recuperation des articles."
        });
    });	
	},

	read: function(req, res){
    Article.find({user_id: req.params.id})
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "Aucun article n'a été ajouté par à l'id " + req.params.id
            });            
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun user ne correspond à l'id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Une erreur s'est produite lors de la recuperation de l'article ajouté avec l'id " + req.params.id
        });
    });
	},

	update: function(req, res){
		// Validate Request
    // if(!req.body.libelle || !req.body.prix) {
    //     return res.status(400).send({
    //         message: "Veuillez remplir le libelle et le prix"
    //     });
    // }

    // Find article and update it with the request body
    Article.findById(req.params.id)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "Aucun article ne correspond à l'id " + req.params.id
            });            
        }

    Article.findByIdAndUpdate(req.params.id, {
        libelle: req.body.libelle || article.libelle,
        prix: req.body.prix || article.prix,
        remise: req.body.remise || article.remise,
        stock: req.body.stock || article.stock
    }, {new: true})
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "Aucun article ne correspond à l'id " + req.params.id
            });
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun article ne correspond à l'id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Impossible de la mettre à jour de l'article avec l'id " + req.params.id
        });
    });

    });
	},

	delete: function(req, res){
		Article.findByIdAndRemove(req.params.id)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "Aucun article ne correspond à l'id " + req.params.id
            });
        }
        res.send({message: "Article supprimer avec succès"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun article ne correspond à l'id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer l'article avec l'id" + req.params.id
        });
    });
	}
}
