import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InvoicePDF from "../components/InvoicePDF";
const API_URL = import.meta.env.VITE_API_BASE_URL;


function InvoiceDetail() {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/api/invoices/read/${id}`)
            .then(response => setInvoice(response.data))
            .catch(error => console.error("Error fetching invoice:", error));
    }, [id]);

    if (!invoice) {
        return <p className="text-gray-500">Loading invoice...</p>;
    }

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Invoice Details</h2>
            <p><strong>Customer:</strong> {invoice.customerName}</p>
            <p><strong>Product:</strong> {invoice.product}</p>
            <p><strong>Price:</strong> ${invoice.price.toFixed(2)}</p>
            <InvoicePDF invoice={invoice} />
        </div>
    );
}

export default InvoiceDetail;
