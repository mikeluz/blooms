var http = require('http'); // require Node HTTP server, parses into head and body
var server = http.createServer(); // create server
var Promise = require('bluebird'); // require bluebird so we can use Promise.all, etc.

server.on('request', require('./app')); // when server receives a request, use 'app.js' to determine what to do with it

server.listen(3001, function() { // first arg is port server will listen on, second arg is callback once listening
	console.log('Server is listening on port 3001!'); // 'I'm listening', i.e., success message
});

