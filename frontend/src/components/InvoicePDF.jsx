import React from 'react';
import jsPDF from 'jspdf';

function InvoicePDF({ invoice }) {
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Invoice", 14, 20);
        doc.setFontSize(12);

        const taxRate = 0.1;
        const subtotal = parseFloat(invoice.price) || 0;
        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        doc.text(`Customer: ${invoice.customerName}`, 14, 30);
        doc.text(`Product: ${invoice.product}`, 14, 40);
        doc.text(`Price: Rs.${subtotal.toFixed(2)}`, 14, 50);
        doc.text(`Tax (10%): Rs.${tax.toFixed(2)}`, 14, 60);
        doc.text(`Total: Rs.${total.toFixed(2)}`, 14, 70);

        doc.save(`Invoice_${invoice.customerName}.pdf`);
    };

    return <button className="mt-4 bg-green-500 text-white cursor-pointer py-2 px-4 rounded hover:bg-green-600" onClick={generatePDF}>Download PDF</button>;
}

export default InvoicePDF;