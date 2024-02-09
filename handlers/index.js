const { getBooks, addBook, deleteBook } = require("../services/bookServices");
const users = require('../data/users.json');
const { createToken } = require("../middleware");

const authHandler = {
    login: (req, res, next) => {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        } else {
            const token = createToken(user)
            res.status(200).json({message: 'Login successful', token });
        }
    }
}

function transformBooks(booksArray) {
    return booksArray.map(book => {
        let bookInfo = book.split(',')
        return {
            name: bookInfo[0],
            author: bookInfo[1],
            year: bookInfo[2]
        }
    })
}

const booksRouteHandler = {
    home: async (req, res, next) => {
        try {
            const userType = req.user.userType;
            let books = await getBooks(userType)
            books = transformBooks(books.slice(1))
            res.status(200).json({ books })
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: `${error}` })
        }
    },

    addBook: async (req, res, next) => {
        try {
            const userType = req.user.userType;
            if (userType !== 'admin') {
                res.status(403).json({ error: 'Forbidden' });
            } else {
                await addBook(req.body);
                res.status(200).json({ message: 'Book added successfully' })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: `${error}` })
        }
    },

    deleteBook: async (req, res, next) => {
        try {
            const userType = req.user.userType;
            if (userType !== 'admin') {
                res.status(403).json({ error: 'Forbidden' });
            } else {
                await deleteBook(req.body)
                res.status(204).json({ message: 'Book deleted successfully' })
            }
        } catch (error) {
            res.status(400).json({ error: `${error}` })
        }
    }
}

module.exports = {
    authHandler,
    booksRouteHandler
}