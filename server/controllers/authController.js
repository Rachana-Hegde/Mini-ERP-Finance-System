const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


exports.register = async (req, res) => {
try {
const { username, password, role } = req.body;
const hashed = await bcrypt.hash(password, 10);
const result = await db.query(
'INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING id, username, role',
[username, hashed, role || 'Project Manager']
);
res.json(result.rows[0]);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Registration failed' });
}
};


exports.login = async (req, res) => {
try {
const { username, password } = req.body;
const result = await db.query('SELECT * FROM users WHERE username=$1', [username]);
if (!result.rowCount) return res.status(400).json({ error: 'Invalid creds' });
const user = result.rows[0];
const ok = await bcrypt.compare(password, user.password_hash);
if (!ok) return res.status(400).json({ error: 'Invalid creds' });
const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Login failed' });
}
};