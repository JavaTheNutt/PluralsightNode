'use strict';
var express = require('express');// pull in express package
var app = express(); // create instance of express
var nav = [{
	Link: '/Books',
	Text: 'Book'
}, {
	Link: '/Authors',
	Text: 'Author'
}];
var bookRouter = require('./src/routes/bookRoutes')(nav);
//var handlebars = require('express-handlebars'); // handlebars needs to be required whereas ejs and jade do not
//app.engine('.hbs', handlebars({extname: '.hbs'})); //this sets the engine to handlebars


var port = process.env.port ||5000; //this will either use the port specified in the environment variable of the gulpfile, or 5000
//hardcoded in as there is no database connectivity yet


app.use(express.static('public')); // this creates a static directory for serving css, javascript and images
 // when a file is requested, server looks through the specified static directories before continuing to routes


app.set('views', './src/views'); // set an internal variable to set views to equal the path specified

//app.set('view engine', 'jade');	//set the view engine to jade
//app.set('view engine', '.hbs');		//set the view engine to handlebars
app.set('view engine', 'ejs');
//set up a router for th books section of the site

//use the above book router for anything with /books in the url
app.use('/Books', bookRouter);
app.get('/', function (req, res) {
	res.render('index', {
		title: 'Hello from render',
		nav: [{
			Link: '/Books',
			Text: 'Books'
		}, {
			Link: '/Authors',
			Text: 'Authors'
		}]
	});
});
/*app.get('/books', function (req, res) {
	res.send('Hello, Books!');
});*/
/*This function takes a port and a callback. The callback will return an error if the connection is unsuccessful*/
app.listen(5000, function (err) {
	console.log('Server started on port ' + port);
});