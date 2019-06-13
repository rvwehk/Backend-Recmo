var express = require('express');
var router = express.Router();
var passport = require('passport');
var articleController = require('../controllers/articleController');
var clientController = require('../controllers/clientController');
var contactController = require('../controllers/contactController');
var userController = require('../controllers/userController');
var panierController = require('../controllers/panierController');
var recuController = require('../controllers/recuController');


// Set default API response
router.get('/index', function (req, res) {
    res.json({
       status: 'API Its Working',
       message: 'Welcome to your API index',
    });
});

/*Route spéciale*/
router.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.marchand.email}! Vous etes connecté.` });
});

/* Articles routes */
router.get('/article', articleController.readAll);
router.post('/article', articleController.create);
router.get('/article/:id', articleController.read);
router.put('/article/:id',articleController.update);
router.delete('/article/:id',articleController.delete);

/* Contact routes */
router.get('/contact', contactController.readAll);
router.post('/contact', contactController.create);
router.get('/contact/:id', contactController.read);
// router.put('/contact/:id',contactController.update);
router.delete('/contact/:id',contactController.delete);

/* User routes */
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user', userController.readAll);
// router.post('/user', userController.create);
router.get('/user/:id', userController.read);
router.put('/user/:id',userController.update);
router.delete('/user/:id',userController.delete);

/* Panier routes */
router.get('/panier', panierController.readAll);
router.post('/panier', panierController.create);
router.get('/panier/:id', panierController.read);
// router.put('/panier/:id',panierController.update);
router.delete('/panier/:id',panierController.delete);

/* Recu routes */
router.get('/recu', recuController.readAll);
router.post('/recu', recuController.create);
router.get('/recu/:id', recuController.read);
// router.put('/recu/:id',recuController.update);
router.delete('/recu/:id',recuController.delete);

// Export API routes
module.exports = router;