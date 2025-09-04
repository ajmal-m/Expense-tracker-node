const express = require('express');
const router = express.Router();
const { createBudget, deleteBudget } = require('../controllers/budget-controller');


router.post('/create', createBudget);
router.delete('/delete/:id', deleteBudget);

module.exports = router;