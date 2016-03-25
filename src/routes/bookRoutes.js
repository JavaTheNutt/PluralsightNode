'use strict';
var express  = require('express');
var bookRouter =  express.Router();

/*Create a function that takes a parameter that will be used for navigation*/
var router = function (nav) {
	var books = [
		{
			title: 'The Lord of the Rings',
			genre: 'Fantasy',
			author: 'JRR Tolkien',
			read: false
		},
		{
			title: 'A Game of Thrones',
			genre: 'Fantasy',
			author: 'George RR Martin',
			read: false
		},
		{
			title: 'A Clash of Kings',
			genre: 'Fantasy',
			author: 'George RR Martin',
			read: false
		},
		{
			title: 'A Storm of Swords',
			genre: 'Fantasy',
			author: 'George RR Martin',
			read: false
		},
		{
			title: 'A Feast for Crows',
			genre: 'Fantasy',
			author: 'George RR Martin',
			read: false
		},
		{
			title: 'A Dance with Dragons',
			genre: 'Fantasy',
			author: 'George RR Martin',
			read: false
		}
	];
	/*This will be the route rendered when the user is at /books in the url*/
	bookRouter.route('/')
		.get(function (req, res) {
			res.render('bookListView', {
				title: 'Hello from books',
				nav: nav,
				books: books
			});
		});
	//this will be the route rendered when the user selects a single book
	bookRouter.route('/:id') // this will add the id to the url
		.get(function (req, res) {
			var id = req.params.id;
			res.render('bookView', {
				title: 'Hello from book',
				nav: nav,
				book: books[id] // select the book with the specified id
			});
		});
	return bookRouter;
};
/*return the function*/
module.exports = router;