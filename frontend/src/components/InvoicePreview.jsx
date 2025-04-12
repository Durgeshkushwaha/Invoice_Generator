import React from "react";
import InvoicePDF from "./InvoicePDF";

function InvoicePreview({ invoice }) {
    if (!invoice) {
        return <p className="text-gray-500 text-center mt-4">No invoice selected.</p>;
    }

    const taxRate = 0.1;
    const subtotal = parseFloat(invoice.price) || 0;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return (
        <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg mt-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">📄 Invoice Preview</h2>

            <div className="space-y-3">
                <p className="text-lg"><strong>👤 Customer:</strong> {invoice.customerName}</p>
                <p className="text-lg"><strong>📦 Product:</strong> {invoice.product}</p>
                <p className="text-lg"><strong>💰 Price:</strong> ₹{subtotal.toFixed(2)}</p>
                <p className="text-lg"><strong>🧾 Tax (10%):</strong> ₹{tax.toFixed(2)}</p>
                <h3 className="text-xl font-bold mt-2">💵 Total: ₹{total.toFixed(2)}</h3>
            </div>

            {/* Download PDF Button */}
            <div className="flex justify-center mt-4">
                <InvoicePDF invoice={invoice} />
            </div>
        </div>
    );
}

export default InvoicePreview;
