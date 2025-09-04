const express = require('express');
const router = express.Router();
const {createExpense, updateExpense, deleteExpense, getExpenses} = require('../controllers/expense-controller');

router.get('/', getExpenses);
router.post('/create', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;