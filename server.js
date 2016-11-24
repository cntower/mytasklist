"use strict";
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('./config/main');

var index = require('./routes/index');
var task = require('./routes/tasks');

var register = require('./routes/register');
var authenticate = require('./routes/authenticate');

var mongojs = require('mongojs');

var app = express();
var port = 3000;

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

// Set url for API group routes
// Set up JWT authentication
app.use('/api', passport.authenticate('jwt', { session: false }), apiRoutes);
app.use('/auth', apiRoutes);

app.use('/', index);
app.use('/api', task);

app.use('/auth', register);
app.use('/auth', authenticate);

app.use('/login', index);
app.use('/register', index);

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}

app.listen(port, ()=> {
    console.log('Server started on port ' + port);
})