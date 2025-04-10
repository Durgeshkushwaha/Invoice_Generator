const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    product: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);