import React, { useState } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoicePreview from "../components/InvoicePreview";

function CreateInvoice() {
    const [invoice, addInvoice] = useState(null);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Create New Invoice</h2>
            <InvoiceForm addInvoice={addInvoice} />
            {invoice && <InvoicePreview invoice={invoice} />}
        </div>
    );
}

export default CreateInvoice;
