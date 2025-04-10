import React, { useState, useEffect } from "react";
import axios from "axios";
import InvoiceTable from "../components/InvoiceTable";

function InvoiceList() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        axios.get("/api/invoices/read")
            .then(response => setInvoices(response.data))
            .catch(error => console.error("Error fetching invoices:", error));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">All Invoices</h2>
            <InvoiceTable invoices={invoices} setInvoices={setInvoices} />
        </div>
    );
}

export default InvoiceList;
