var User = require('../models/User');

module.exports = {
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
		User.findById(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.id
        });
    });
	},

	update: function(req, res){
		// Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.id, {
        email: req.body.email,
        password: req.body.password,
        tel: req.body.tel,
        adresse: req.body.adresse,
        avatar: req.body.avatar,
        
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
	},

	delete: function(req, res){
		User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.id
        });
    });
	},

    register: function(req, res){
        if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'Veuillez entrer votre email et mot de passe' });
        }
 
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
     
            if (user) {
                return res.status(400).json({ 'msg': 'Ce compte existe dejà' });
            }
     
            let newUser = User(req.body);
            newUser.save((err, user) => {
                if (err) {
                    return res.status(400).json({ 'msg': err });
                }
                return res.status(201).json(user);
            });
        });
    },

    login: function(req, res){
        if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'Veuillez entrer votre email et mot de passe' });
        }
     
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                return res.status(400).send({ 'msg': err });
            }
     
            if (!user) {
                return res.status(400).json({ 'msg': 'Ce compte n\'existe pas' });
            }
     
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    return res.status(200).json({
                        token: createToken(user),
                        user: user
                    });
                } else {
                    return res.status(400).json({ msg: 'L\'email et le mot de passe ne correspondent pas.' });
                }
            });
        });
    },
}

