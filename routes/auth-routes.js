const express = require('express');
const router = express.Router();
const { Register, Login, checkAuthenticated } = require('../controllers/auth-controller');

router.post('/register', Register);
router.post('/login', Login);
router.get('/me', checkAuthenticated);

module.exports = router;