// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find({}, (err, books) => {
    if (err) next(err);
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', { title: 'Add book', books: {} });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', ({ body: { title, author, price, genre } }, res, next) => {
  // create a specific book in the database
  book.create({ 
    Title: title, 
    Author: author, 
    Price: price, 
    Genre: genre 
  }, err => {
    if(err) next(err); 
    else res.redirect('/books');
  })
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', ({ params: { id } }, res, next) => {
  // find a specific book in the books collection
  book.find({ Title: id }, (err, book) => {
    if (err) next(err);
    else {
      res.render('books/details', {
        title: book.Title,
        books: book
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', ({ params: { id }, body: { title, author, price, genre } } , res, next) => {
  // update a specific book in the books collection
  book.update(
    { _id: id },
    { 
      Title: title,
      Author: author,
      Price: price,
      Genre: genre
    }, err => {
      if (err) next(err);
      else res.redirect('/books');
  })
});

// GET - process the delete by user id
router.get('/delete/:id', ({ params: { id } }, res, next) => {
  // delete a specific book in the books collection
  book.deleteOne({ _id: id }, err => {
    if (err) next(err);
    else res.redirect('/books');
  })
});

module.exports = router;