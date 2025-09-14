const express = require('express');
const router = express.Router();
const { getMonthlyExpense } = require('../controllers/analytics-controller');
const { authenticatedRoute } = require('../middleware/auth-middleware');


router.get('/monthly-expense', authenticatedRoute, getMonthlyExpense);

module.exports = router;