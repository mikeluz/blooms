var express = require('express'); // requires express.js
var app = express(); // defines app.js as an instance of express

var morgan = require('morgan'); // logging middleware
var bodyParser = require('body-parser'); // required to access body of HTTP requests

var nunjucks = require('nunjucks'); // require nunjucks for dynamic HTML

var path = require('path'); // node module that provides utilities for working with file and directory path
module.exports = app; // exports app so it can be used/referenced elsewhere in program

app.set('view engine', 'html'); // '.set' is an express method which sets "application settings", options provided by express
app.engine('html', nunjucks.render);
var env = nunjucks.configure('views', { noCache: true }); // why capture what .configure returns in "env" ?
// require('./filters')(env); // need to understand filters better

// var AutoEscapeExtension = require('nunjucks-autoescape')(nunjucks);
// env.addExtension('AutoEscapeExtension', new AutoEscapeExtension(env));

// '.use' is an express method that mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.
// since path defaults to “/”, middleware mounted without a path will be executed for every request to the app (for instance when path is not defined explicitly)
app.use(morgan('dev')); // 'dev" is a built-in morgan format option, see morgan docs
app.use(express.static(path.join(__dirname, './public'))); // sets "/public" folder to static
app.use(bodyParser.urlencoded({ extended: false })); // enables parsing of url-encoded bodies, a new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
app.use(bodyParser.json()); // enables parsing of .json

app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// redirects requests for the indicated URIs to the relevant routers 
// app.use('/record', require('./routes/record')); // sets "/record" URI path to the record router
// app.use('/artists', require('./routes/artists')); // sets "/artists" URI path to the artists router

app.get('/saying', function (req, res, next) { // basic GET request for homepage
	console.log(req.body);
	var phrase = req.body.saying;
	res.render('index');
});

app.get('/', function (req, res, next) { // basic GET request for homepage
	// console.log("Working");
	// res.send("Working");
	res.render('index');
});

// error handling middleware, comes last and globally deals with errors
// first arg is an error, this distinguishes it from other .use instances
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send(err.message);
});