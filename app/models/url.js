'use strict';

var mongoose = require('mongoose');

var urlSchema = mongoose.Schema({
    url: String,
    urlNum: Number
});


module.exports = mongoose.model('Url', urlSchema);