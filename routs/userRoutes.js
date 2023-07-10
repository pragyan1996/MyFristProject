const express = require('express');
const { login, register, current } = require('../Controller/userController');
const validetToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.post('/registerUser',register)

router.post('/login',login)

router.get('/current',validetToken,current)

module.exports = router;
