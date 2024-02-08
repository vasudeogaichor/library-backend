const express = require('express');
const { loginHandler, booksRouteHandler } = require('../handlers');
const router = express.Router();

router.post('/login', loginHandler);

router.get('/books/home', authenticateToken, booksRouteHandler.home);

router.post('/books/addBook', authenticateToken, booksRouteHandler.addBook);

router.delete('/books/deleteBook', authenticateToken, booksRouteHandler.deleteBook);

module.exports = router