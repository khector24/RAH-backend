// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Use an env variable for the secret

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            console.log('User from JWT:', req.user);
            console.log('Manager ID:', req.user.id);

            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

module.exports = authenticateJWT;
