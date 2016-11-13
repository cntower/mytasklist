var express = require('express');
var router = express.Router();
var User = require('./../app/models/user');

// Register new users
router.post('/register', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, message: 'Please enter an username and password to register.' })
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });

        // Attempt to save the new user
        newUser.save(function (err) {
            if (err) {
                console.log(err);
                res.json({ success: false, message: 'That username address already exists.' })
            } else {
                res.json({ success: true, message: 'Successfully created new user.' })
            }
        })
    }
})

module.exports = router;