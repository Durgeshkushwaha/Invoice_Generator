import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/AuthContext';
const API_URL = import.meta.env.VITE_API_BASE_URL;



function InvoiceForm({ addInvoice }) {
    const [customerName, setCustomerName] = useState('');
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');

    const { token } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${API_URL}/api/invoices/create`, {
                customerName,
                product,
                price,
            },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            addInvoice(response.data); // Update UI with new invoice
            setCustomerName("");
            setProduct("");
            setPrice("");
            console.log("Invoice added successfully"); // Debugging
            toast.success("Invoice added successfully");
        } catch (error) {
            console.error("Error adding invoice:", error);
            toast.error("Failed to add invoice");
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-purple-500 to-blue-500 p-4 shadow-lg rounded-2xl max-w-lg mx-auto w-full"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-white">📝 Add Invoice Details</h2>

                <div className="space-y-5">
                    <input
                        type="text"
                        placeholder="👤 Customer Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="w-full p-3 border-1 rounded-full shadow-md text-gray-900 focus:ring-2 focus:ring-blue-300 placeholder-gray-600"
                    />

                    <input
                        type="text"
                        placeholder="📦 Product"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        required
                        className="w-full p-3 border-1 rounded-full shadow-md text-gray-900 focus:ring-2 focus:ring-blue-300 placeholder-gray-600"
                    />

                    <input
                        type="number"
                        placeholder="💰 Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full p-3 border-1 rounded-full shadow-md text-gray-900 focus:ring-2 focus:ring-blue-300 placeholder-gray-600"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 cursor-pointer text-white p-3 rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition transform duration-300"
                    >
                        ➕ Add Invoice
                    </button>
                </div>
            </form>

        </>
    );
}

export default InvoiceForm;