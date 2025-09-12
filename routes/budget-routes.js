const express = require('express');
const router = express.Router();
const { createBudget, deleteBudget , getBudgets } = require('../controllers/budget-controller');
const { authenticatedRoute } = require('../middleware/auth-middleware');


router.get('/all', authenticatedRoute, getBudgets);
router.post('/create', authenticatedRoute, createBudget);
router.delete('/delete/:id', authenticatedRoute, deleteBudget);
router.get('/', authenticatedRoute, getBudgets);

module.exports = router;