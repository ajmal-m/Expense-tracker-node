const express = require('express');
const router = express.Router();
const { getMonthlyExpense } = require('../controllers/analytics-controller');
const { authenticatedRoute } = require('../middleware/auth-middleware');


router.get('/monthly-expenses', authenticatedRoute, getMonthlyExpense);

module.exports = router;