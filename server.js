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

var register = require('./routes/register');
var authenticate = require('./routes/authenticate');

var mongojs = require('mongojs');
var db = mongojs('mytasklist', ['tasks']);

var app = express();
var port = 3000;

/*
//jwt
app.use('/api', expressJWT({secret:'secret'}));
*/

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Foloder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser
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

apiRoutes.get('/dashboard', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
})

// Set url for API group routes
app.use('/api', apiRoutes);
app.use('/auth', apiRoutes);

app.use('/', index);
app.use('/api', task);

app.use('/auth', register);
app.use('/auth', authenticate);

app.use('/login', index);
app.use('/register', index);


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

User.findOne({ role: 'Admin' }, function (err, result) {
    if (!result) {
        {
            var newUser = new User({
                email: config.admin.email,
                password: config.admin.password,
                role: config.admin.role
            });

            // Attempt to save the new admin
            newUser.save(function (err) {
                if (err) {
                    if (err) throw err;
                } else {
                    console.log('Successfully created new admin.')
                }
            })
        }
    }
});