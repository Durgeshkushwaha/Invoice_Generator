const express = require('express');
const router = express.Router();

const { createlogin } = require("../controllers/LoginController")

router.post("/create", createlogin)

module.exports = router;