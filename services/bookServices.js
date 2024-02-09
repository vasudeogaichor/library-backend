const path = require('path');
const dataPath = path.join(__dirname, '../data/');
const fs = require('fs').promises;

async function readCSVFile(filename) {
    try {
        const data = await fs.readFile(dataPath + filename, 'utf8');
        const lines = data.split('\n').map(line => line.trim());
        return lines;
    } catch (err) {
        throw new Error(err);
    }
}

const getBooks = async (userType) => {
    let books = []
    if (userType === 'admin') {
        books = books.concat(await readCSVFile('regularUser.csv'));
        
        books = books.concat((await readCSVFile('adminUser.csv')).slice(1));
    } else {
        books = await readCSVFile('regularUser.csv');
    }

    return books
}

const addBook = async ({ name, author, year }) => {
    if (typeof name !== 'string' || typeof author !== 'string' || isNaN(year) || !Number.isInteger(Number(year)) || year <=0 ) {
        throw new Error('Invalid parameters');
    }

    fs.appendFile(dataPath + 'regularUser.csv', `\n${name},${author},${year}`);
}

const deleteBook = async ({name}) => {
    if (typeof name !== 'string') {
        throw new Error('Invalid parameters');
    }
    const books = await readCSVFile('regularUser.csv');
    const updatedBooks = books.filter(book => book.split(',')[0].toLowerCase() !== name.toLowerCase());
    await fs.writeFile(dataPath + 'regularUser.csv', updatedBooks.join('\n'));
}

module.exports = {
    getBooks,
    addBook,
    deleteBook
}