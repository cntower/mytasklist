var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var task = require('./routes/tasks');

var mongojs = require('mongojs');
var db = mongojs('mytasklist', ['tasks']);

var app = express();
var port = 3000;
//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Foloder
app.use(express.static(path.join(__dirname, 'client')));

//Body ParserMW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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