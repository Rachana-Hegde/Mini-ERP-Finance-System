// server/controllers/insightController.js
const db = require('../config/db');

//
// Predictive Risk Score — simple rules
//
exports.projectRisk = async (req, res) => {
  const { projectId } = req.params;
  try {
    const p = await db.query('SELECT id, budget, spent, progress FROM projects WHERE id=$1', [projectId]);
    if (!p.rowCount) return res.status(404).json({ error: 'Project not found' });
    const project = p.rows[0];

    let score = 0;

    // delayed invoices penalty
    const invRes = await db.query(
      "SELECT COUNT(*) FROM invoices WHERE project_id=$1 AND status <> $2 AND due_date < now()",
      [project.id, 'Paid']
    );
    const delayedInv = parseInt(invRes.rows[0].count, 10) || 0;
    score += Math.min(30, delayedInv * 10);

    // budget overrun
    if (parseFloat(project.spent) > parseFloat(project.budget)) score += 40;
    else {
      const usedPct = (parseFloat(project.spent) / parseFloat(project.budget)) * 100;
      if (usedPct > 80) score += 20;
    }

    // progress mismatch (if spent >> progress)
    const usedPct = (parseFloat(project.spent) / parseFloat(project.budget)) * 100;
    if (usedPct > project.progress + 20) score += 30;

    if (score > 90) score = 90;

    let level = 'Low';
    if (score > 60) level = 'High';
    else if (score > 30) level = 'Medium';

    res.json({ project_id: project.id, risk_score: score, risk_level: level });
  } catch (err) {
    console.error('projectRisk error:', err);
    res.status(500).json({ error: 'Failed to calculate risk' });
  }
};

//
// Cashflow forecast: simple moving-average of last 3 months + trend
//
exports.cashflowForecast = async (req, res) => {
  try {
    const q = `
      SELECT date_trunc('month', created_at) as month,
             SUM(CASE WHEN type='credit' THEN amount WHEN type='debit' THEN -amount ELSE 0 END) as net
      FROM transactions
      WHERE created_at > now() - interval '6 months'
      GROUP BY 1
      ORDER BY 1
    `;
    const result = await db.query(q);
    const rows = result.rows.map(r => parseFloat(r.net || 0));
    if (rows.length === 0) return res.json({ forecast: 0 });

    // simple projection: average last 3 months
    const last3 = rows.slice(-3);
    const avg = last3.reduce((a, b) => a + b, 0) / last3.length;

    // add a small trend based on difference between last and first
    const trend = (rows[rows.length - 1] - rows[0]) / Math.max(1, rows.length);
    const forecast = Math.round(avg + trend);

    res.json({ forecast });
  } catch (err) {
    console.error('cashflowForecast error:', err);
    res.status(500).json({ error: 'Failed to generate forecast' });
  }
};
