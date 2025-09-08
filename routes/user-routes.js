
const express = require('express');
const router = express.Router();
const {updateUser} = require('../controllers/user-controller');

router.put('/update', updateUser);

module.exports = router;
