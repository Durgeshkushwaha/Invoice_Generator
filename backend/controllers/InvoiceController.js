const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');



// Create an invoice
createinvoice = async (req, res) => {
    try {
        const { customerName, product, price } = req.body;
        const newInvoice = new Invoice({ customerName, product, price });
        await newInvoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all invoices
readinvoice = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Invoices
updateinvoice = async (req, res) => {
    try {
        const { customerName, product, price } = req.body;
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            req.params.id,
            { customerName, product, price },
            { new: true }
        );

        if (!updatedInvoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.json(updatedInvoice);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete an invoice
deleteinvoice = async (req, res) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.json({ message: "Invoice deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { createinvoice, readinvoice, updateinvoice, deleteinvoice };