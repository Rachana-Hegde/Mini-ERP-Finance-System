const db = require('../config/db');


exports.listUsers = async (req, res) => {
try {
const result = await db.query('SELECT id, username, role, created_at FROM users ORDER BY id');
res.json(result.rows);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to fetch users' });
}
};


exports.getUser = async (req, res) => {
const { id } = req.params;
try {
const result = await db.query('SELECT id, username, role, created_at FROM users WHERE id=$1', [id]);
if (!result.rowCount) return res.status(404).json({ error: 'Not found' });
res.json(result.rows[0]);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed' });
}
};