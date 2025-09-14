const express = require('express');
const router = express.Router();
const { getMonthlyExpense , getMonthlyCategoryWiseExpense } = require('../controllers/analytics-controller');
const { authenticatedRoute } = require('../middleware/auth-middleware');


router.get('/monthly-expenses', authenticatedRoute, getMonthlyExpense);
router.get('/monthly-category-expenses', authenticatedRoute, getMonthlyCategoryWiseExpense);


module.exports = router;