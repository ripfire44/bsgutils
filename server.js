'use strict';

// simple express server
var express = require('express');
var app = express();
var path = require('path');

var publicDir = path.join(__dirname, 'wwwroot');
var port = 5000;

// Setup public dir
app.use(express.static(publicDir));

app.listen(port);
console.log(`Server started, listening to port ${port}. (Press CTRL+C to quit)`);