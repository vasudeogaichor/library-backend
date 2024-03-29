require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET_KEY

function createToken(user) {
    return jwt.sign({ username: user.username, userType: user.userType }, secretKey, {expiresIn: '1h'});
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = user;
        next();
    });
}

module.exports = {
    createToken,
    authenticateToken
}