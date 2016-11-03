var JwtStrategy=require('passport-jwt').Strategy;
var extractJwt=require('passport-jwt').ExtractJwt;
var user = require('../app/models/user');
var config = require('../config/main');

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = extractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_playload, done){
        user.findOne({id:jwt_playload.id}, function(err, user){
            if (err){
                return done(err, false)
            }
            if (user){
                done(null,user)
            } else {
                done(null, false)
            }
        })
    }))
}