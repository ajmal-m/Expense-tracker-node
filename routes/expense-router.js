const express = require('express');
const router = express.Router();
const {createExpense, updateExpense, deleteExpense, getExpenses} = require('../controllers/expense-controller');
const { authenticatedRoute } = require('../middleware/auth-middleware');

router.get('/', authenticatedRoute, getExpenses);
router.post('/create', authenticatedRoute, createExpense);
router.put('/:id', authenticatedRoute, updateExpense);
router.delete('/:id', authenticatedRoute, deleteExpense);

module.exports = router;