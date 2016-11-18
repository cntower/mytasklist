"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../app/models/user');
var Task = require('../app/models/task');

var Token = require('../app/modules/token');
var token = new Token();

//Get All Tasks
router.get('/tasks', (req, res, next) => {
    token.verify(req, (err, decoded) => {
        if (err) {
            res.send(err);
        } else {
            Task.find({ author: decoded._doc._id }, (err, tasks) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(tasks);
                    
                }
            });
        }
    });

});


//Get Single Task
router.get('/task/:id', (req, res, next) => {
    token.verify(req, (err, decoded) => {
        if (err) {
            res.send(err);
        } else {
            Task.findOne({ _id: req.params.id, author: decoded._doc._id }, (err, task) => {
                if (err) {
                    res.send(err);
                } else res.json(task);
            });
        }
    })
});

//Save Task
router.post('/task', (req, res, next) => {
    var task = req.body;
    if (!task.title || (task.isDone)) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        })
    } else {
        token.verify(req, (err, decoded) => {
            if (err) {
                res.send(err);
            } else {
                var newTask = new Task({
                    title: task.title,
                    author: decoded._doc._id
                });

                // Attempt to save the new task
                newTask.save((err, task, next) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(task);
                    }
                })
            }
        });

    }
})

//Delete Task
router.delete('/task/:id', (req, res, next) => {
    token.verify(req, (err, decoded) => {
        if (err) {
            res.send(err);
        } else {
            Task.findOneAndRemove({ _id: req.params.id, author: decoded._doc._id }, (err, task) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(task);
                }
            })
        }
    })
});

//Update Task
router.put('/task/:id', (req, res, next) => {
    token.verify(req, (err, decoded) => {
        if (err) {
            res.send(err);
        } else {
            Task.findOne({ _id: req.params.id, author: decoded._doc._id }, (err, task) => {
                if (err) {
                    res.send(err);
                } else {
                    task.title = req.body.title;
                    task.isDone = req.body.isDone;
                    task.author = decoded._doc._id;
                    task.save((err, task, next) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json(task);
                        }
                    })
                }

            })
        }
    })
});

module.exports = router;