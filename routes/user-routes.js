
const express = require('express');
const router = express.Router();
const {updateUser} = require('../controllers/user-controller');
const { authenticatedRoute } = require('../middleware/auth-middleware');

router.put('/update', authenticatedRoute, updateUser);

module.exports = router;
