var Marchand = require('../models/marchand');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt  = require('passport-jwt').ExtractJwt;
var config = require('../config/config');
 
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}
 
module.exports = new JwtStrategy(opts, function (jwt_payload, done) {
    Marchand.findById(jwt_payload.id, function (err, marchand) {
        if (err) {
            return done(err, false);
        }
        if (marchand) {
            return done(null, marchand);
        } else {
            return done(null, false);
        }
    });
});