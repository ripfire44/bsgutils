'use strict';

// simple express server
var express = require('express');
var app = express();
var path = require('path');

var publicDir = path.join(__dirname, 'public');
var port = 5000;

// Setup public dir
app.use(express.static(publicDir));
// Default document for SPA
app.all('/*', function(req, res) {
	res.redirect('/');
});

app.listen(port);