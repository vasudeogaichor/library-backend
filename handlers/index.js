const { getBooks, addBook, deleteBook } = require("../services/bookServices");
const users = require('../data/users.json');


const authHandler = {
    login: (req, res, next) => {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = creat(user)
        res.status(200).json({message: 'Login successful', token });
    }
}

const booksRouteHandler = {
    home: async (req, res, next) => {
        try {
            const userType = req.user.userType;
            let books = await getBooks(userType)
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
            }
            await addBook(req.body);
            res.status(200).json({ message: 'Book added successfully' })
        } catch {
            console.log(error)
            res.status(400).json({ error: `${error}` })
        }
        next()
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