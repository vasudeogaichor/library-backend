require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const app = express();

app.use(bodyParser.json());
app.use('/api', router)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
