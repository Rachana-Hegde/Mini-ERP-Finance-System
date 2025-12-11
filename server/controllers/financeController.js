const db = require('../config/db');


// Create a simple invoice
exports.createInvoice = async (req, res) => {
try {
const { project_id, customer_id, vendor_id, amount, currency, due_date } = req.body;
const result = await db.query(
`INSERT INTO invoices (project_id, customer_id, vendor_id, amount, currency, due_date, status) VALUES ($1,$2,$3,$4,$5,$6,'Draft') RETURNING *`,
[project_id, customer_id, vendor_id, amount, currency, due_date]
);


// Add a transaction in ledger (simple)
await db.query(
`INSERT INTO transactions (invoice_id, account_code, amount, type) VALUES ($1,'AR', $2, 'debit')`,
[result.rows[0].id, amount]
);


res.json(result.rows[0]);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to create invoice' });
}
};


exports.listInvoices = async (req, res) => {
try {
const result = await db.query('SELECT * FROM invoices ORDER BY created_at DESC');
res.json(result.rows);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to fetch invoices' });
}
};


// Quick cashflow summary (last 6 months incoming vs outgoing)
exports.cashflowSummary = async (req, res) => {
try {
const q = `SELECT date_trunc('month', created_at) as month, SUM(CASE WHEN type='credit' THEN amount ELSE 0 END) as inflow, SUM(CASE WHEN type='debit' THEN amount ELSE 0 END) as outflow FROM transactions WHERE created_at > now() - interval '6 months' GROUP BY 1 ORDER BY 1`;
const result = await db.query(q);
res.json(result.rows);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed' });
}
};