const fs = require('fs').promises;

async function readCSVFile(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        const lines = data.split('\n').map(line => line.trim());
        return lines;
    } catch (err) {
        throw new Error(err);
    }
}

const getBooks = async (userType) => {
    if (userType === 'admin') {
        books = books.concat(await readCSVFile('regularUser.csv'));
        books = books.concat(await readCSVFile('adminUser.csv'));
    } else {
        books = await readCSVFile('regularUser.csv');
    }

    return books
}

const addBook = async ({ name, author, year }) => {
    if (typeof name !== 'string' || typeof author !== 'string' || isNaN(year) || !Number.isInteger(Number(year))) {
        throw new Error('Invalid parameters');
    }

    fs.appendFile('regularUser.csv', `\n${name},${author},${year}`);
}

const deleteBook = async({name}) => {
    if (typeof name !== 'string') {
        throw new Error('Invalid parameters');
    }

    const books = readCSVFile('regularUser.csv');
    const updatedBooks = books.filter(book => book.toLowerCase() !== name.toLowerCase());
    await fs.writeFile('regularUser.csv', updatedBooks.join('\n'));
}

module.exports = {
    getBooks,
    addBook,
    deleteBook
}