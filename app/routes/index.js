'use strict';

var path = process.cwd();
var Url = require('../models/url');
var random = require('../common/random');
require('dotenv').load();

module.exports = function (app) {
	
	app.get('/',function (req, res) {
		res.sendFile(path + '/public/index.html');
	});
	
	app.get('/new/:url',function (req, res) {
		var url = req.params.url;
		res.setHeader('Content-Type', 'application/json');
		if(/^(http:\/\/)?[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+$/.test(url)){
			var urlNum = random();
			var newUrl = new Url({ url: url, urlNum: urlNum });
			
			newUrl.save(function (err, data) {
				if (err) console.log(err);
				else console.log('Saved : ', data );
			});
			res.json({"original_url":url,"short_url":process.env.APP_URL + urlNum});
		}
		else{
			res.json({"error":"Wrong url format."});
		}
	});
	
	app.get('/url-list', function(req, res) {
	  Url.find({}, function(err, urls) {
	  	if (err) console.log(err);
	    res.send(urls);  
	  });
	});
	
	app.get('/:id', function(req, res) {
	  var id = req.params.id;
	  Url.findOne({ urlNum: id }, function(err, doc) {
	  	if (err) console.log(err);
	  	
	  	if(doc){
	  		res.redirect('http://' + doc.url);
	  	}
	  	else{
	  		res.setHeader('Content-Type', 'application/json');
	  		res.json({"error":"This url is not in the database."})
	  	}
	  	
	      
	  });
	});
	
	
	
};
