const express = require('express');
const router = express.Router();
const {createCategory, deleteCategory , getCategories} = require('../controllers/category-controller');
const {authenticatedRoute} = require('../middleware/auth-middleware');

router.get('/all', authenticatedRoute, getCategories);
router.post('/create', authenticatedRoute, createCategory);
router.delete('/delete/:id', authenticatedRoute, deleteCategory);

module.exports = router;