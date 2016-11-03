"use strict";
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('./config/main');
var User = require('./app/models/user');

//var expressJWT = require('express-jwt');

var index = require('./routes/index');
var task = require('./routes/tasks');

var mongojs = require('mongojs');
var db = mongojs('mytasklist', ['tasks']);

var app = express();
var port = 3000;

/*
//jwt
app.use('/api', expressJWT({secret:'secret'}));
*/

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Foloder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log requests to console
app.use(morgan('dev'));

// Initilaize passport for use
app.use(passport.initialize());

// Connect to db for users
mongoose.connect(config.database);

// Bring in passport strategy
require('./config/passport')(passport);

// Create API group routes
var apiRoutes = express.Router();

// Register new users
apiRoutes.post('/register', function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({ success: false, message: 'Please enter an email and password to register.' })
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });
    }

    // Attempt to save the new user
    newUser.save(function (err) {
        if (err) {
            res.json({ success: false, message: 'That email address already exists.' })
        } else {
            res.json({ success: true, message: 'Successfully created new user.' })
        }
    })
})

// Autentificate the user and get a jwt
apiRoutes.post('/authenticate', function (req, res) {
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
                        expiresIn: 10080 //in seconds
                    })
                    res.json({ success: true, token: 'JWT ' + token })
                } else {
                    res.send({ success: false, message: 'Autentification failed. Password did not match.' })
                }
            })
        }
    })
})

apiRoutes.get('/dashboard', passport.authenticate('jwt', {session:false}),function(req,res){
    res.send('It worked! User id is: '+req.user._id+'.');
})

// Set url for API group routes
app.use('/api', apiRoutes);

app.use('/', index);
app.use('/api', task);

app.listen(port, function () {
    console.log('Server started on port ' + port);
})

db.tasks.count(function (err, result) {
    if (result == 0) {
        var parsedJSON = require('./tasks.collection');
        console.log(parsedJSON);
        db.tasks.insert(parsedJSON);
    }
});