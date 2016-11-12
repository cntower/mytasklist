var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('./../config/main');
var User = require('./../app/models/user');

// Autentificate the user and get a jwt
router.post('/authenticate', function (req, res) {
    
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.send({ success: false, message: 'Autentification failed. User not found.' })
        } else {
            // Check if the password mathes
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    //Create the token
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 60 //in seconds
                    })
                    res.json({ success: true, token: 'JWT ' + token })
                } else {
                    res.send({ success: false, message: 'Autentification failed. Password did not match.' })
                }
            })
        }
    })
})

module.exports = router;