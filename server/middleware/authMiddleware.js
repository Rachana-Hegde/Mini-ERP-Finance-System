const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const authenticate = (req, res, next) => {
const authHeader = req.headers.authorization;
if (!authHeader) return res.status(401).json({ error: 'Missing token' });
const token = authHeader.split(' ')[1];
try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
req.user = payload; // { id, username, role }
next();
} catch (err) {
return res.status(401).json({ error: 'Invalid token' });
}
};


const authorize = (allowedRoles = []) => (req, res, next) => {
if (!req.user) return res.status(401).json({ error: 'Missing user' });
if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
return res.status(403).json({ error: 'Forbidden' });
}
next();
};


module.exports = { authenticate, authorize };