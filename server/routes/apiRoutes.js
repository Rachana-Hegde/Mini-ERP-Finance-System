const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const financeController = require('../controllers/financeController');
const insightController = require('../controllers/insightController');
const userRoutes = require('./userRoutes');
router.use('/users', userRoutes);


// Admin user routes
router.get('/users', authenticate, authorize(['Admin']), userController.listUsers);
router.get('/users/:id', authenticate, authorize(['Admin']), userController.getUser);


// Finance
router.post('/invoices', authenticate, authorize(['Finance Manager','Admin']), financeController.createInvoice);
router.get('/invoices', authenticate, financeController.listInvoices);
router.get('/cashflow', authenticate, financeController.cashflowSummary);


// Insights
router.get('/insights/project/:projectId/risk', authenticate, insightController.projectRisk);
router.get('/insights/cashflow/forecast', authenticate, insightController.cashflowForecast);


module.exports = router;