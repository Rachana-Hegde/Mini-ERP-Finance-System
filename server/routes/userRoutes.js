const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Only Admin can view user list or individual user details
router.get('/', authenticate, authorize(['Admin']), userController.listUsers);
router.get('/:id', authenticate, authorize(['Admin']), userController.getUser);

module.exports = router;
