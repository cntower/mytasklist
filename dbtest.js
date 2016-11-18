"use strict";

var mongoose = require('mongoose');
var mongojs = require('mongojs');
var User = require('./app/models/user');
var Task2 = require('./app/models/task');
var config = require('./config/main');


class dbtest {
    constructor() {
        this.user = null;
        console.log('dbtest.constructor');
    }
    showCollections() {

        var dbz = mongojs(config.database, []);
        dbz.getCollectionNames(function (e, cols) {
            cols.forEach(function (col) {
                console.log(col);
            });
        });
        var users = dbz.collection('task2');
        users.find((err, docs) => {
            console.log(docs);
        });

    }

    // user test
    userCreate(cb) {
        User.remove({ username: 'test' }, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                var newUser = new User({
                    username: 'test',
                    password: 'test'
                });

                // Attempt to save the new admin
                newUser.save(function (err, user) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Successfully created new user.');
                        cb(user);
                    }
                })
            }
        });
    }

    // task test
    taskCreate(cb) {
        this.userCreate((user) => {
            console.log(user.username);
            var newTask = new Task2({
                title: 'Task number one',
                author: user._id
            })
            // Attempt to save the new task
            newTask.save(function (err, task) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Successfully created new task.');
                    cb(task);
                }
            })
        })
    }
    taskShow() {
        var self = this;
        this.taskCreate((task) => {
            console.log(task);
            task.populate('author', function (err, task2) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(task2);
                };
            });
        })
    }

}

module.exports = dbtest;