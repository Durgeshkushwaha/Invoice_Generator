const express = require('express');
const router = express.Router();

const { createsignup } = require('../controllers/SignupController')

router.post('/create', createsignup);

module.exports = router