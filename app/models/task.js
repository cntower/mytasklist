var mongoose = require('mongoose');

// Task schema
var TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: false,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    date: { type: Date, default: Date.now },
    author:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('task2', TaskSchema);