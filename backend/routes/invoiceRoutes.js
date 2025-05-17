const express = require('express');
const Invoice = require('../models/Invoice');
const router = express.Router();
const { createinvoice, readinvoice, updateinvoice, deleteinvoice } = require('../controllers/InvoiceController');
const authenticateToken = require('../middleware/authMiddleware');


// Create an invoice
router.post('/create', authenticateToken, createinvoice);

// Get all invoices
router.get('/read',authenticateToken, readinvoice);

// Update Invoices
router.put("/update/:id", authenticateToken, updateinvoice);


// Delete an invoice
router.delete("/delete/:id", authenticateToken, deleteinvoice);


module.exports = router;