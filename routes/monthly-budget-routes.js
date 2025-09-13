const express = require('express');
const router = express.Router();
const {getMonthlyBudget , createMonthlyBudget, updateMonthlyBudget} = require('../controllers/monthly-budget-controller');
const { authenticatedRoute } = require('../middleware/auth-middleware');

router.get('/', authenticatedRoute , getMonthlyBudget);
router.post('/', authenticatedRoute , createMonthlyBudget);
router.put('/:id', authenticatedRoute,  updateMonthlyBudget);

module.exports = router;