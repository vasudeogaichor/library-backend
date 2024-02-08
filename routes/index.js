const express = require('express');
const { authenticateToken } = require('../middleware')
const { authHandler, booksRouteHandler } = require('../handlers');
const router = express.Router();

router.post('/auth/login', authHandler.login);

router.get('/books/home', authenticateToken, booksRouteHandler.home);

router.post('/books/addBook', authenticateToken, booksRouteHandler.addBook);

router.delete('/books/deleteBook', authenticateToken, booksRouteHandler.deleteBook);

module.exports = router