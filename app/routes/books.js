const express = require('express'),
    booksRoutes = express.Router(),
    BookController = require('../controllers/book');

module.exports = (app) => {

    booksRoutes.get('/books', BookController.getAll);

    booksRoutes.get('/books/new', BookController.new);
    booksRoutes.post('/books/create', BookController.new);

    booksRoutes.get('/books/filter', BookController.filterByCategory);

    booksRoutes.get('/books/:id', BookController.getById);

    booksRoutes.get('/books/:id/edit', BookController.edit);
    booksRoutes.post('/books/:id/update', BookController.edit);

    booksRoutes.post('/books/:id/changeStatus', BookController.changeStatus);

    booksRoutes.get('/books/:id/delete', BookController.deleteById);

    app.use('/', booksRoutes);

};