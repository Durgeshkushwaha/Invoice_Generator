import React, { useState } from "react";
import axios from "axios";
import jsPDF from 'jspdf';
import { useAuth } from "../contexts/AuthContext";
import { toast } from 'react-toastify'
const API_URL = import.meta.env.VITE_API_BASE_URL;



function InvoiceTable({ invoices, setInvoices }) {
    const [editingInvoice, setEditingInvoice] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const { token } = useAuth();

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const invoicesPerPage = 5; // Show 5 invoices per page

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/invoices/delete/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setInvoices(invoices.filter(invoice => invoice._id !== id));
            toast.success("Invoice deleted successfully!")
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    };

    const handleEditClick = (invoice) => {
        setEditingInvoice(invoice);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${API_URL}/api/invoices/update/${editingInvoice._id}`,
                editingInvoice,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setInvoices(invoices.map(inv => (inv._id === editingInvoice._id ? response.data : inv)));
            setEditingInvoice(null);
            toast.success("Invoice Updated Successfully!")
        } catch (error) {
            console.error("Error updating invoice:", error);
        }
    };

    const generatePDF = (invoice) => {
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
        doc.text(`Price: ₹${subtotal.toFixed(2)}`, 14, 50);
        doc.text(`Tax (10%): ₹${tax.toFixed(2)}`, 14, 60);
        doc.text(`Total: ₹${total.toFixed(2)}`, 14, 70);

        doc.save(`Invoice_${invoice.customerName}.pdf`);
    };


    // 🔍 Filter invoices based on search & price range
    const filteredInvoices = invoices.filter(invoice => {
        const matchesSearch =
            invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.product.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPrice =
            (!minPrice || invoice.price >= parseFloat(minPrice)) &&
            (!maxPrice || invoice.price <= parseFloat(maxPrice));

        return matchesSearch && matchesPrice;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);
    const indexOfLastInvoice = currentPage * invoicesPerPage;
    const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
    const currentInvoices = filteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

    return (
        <div className="mt-6 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">📄 Past Invoices</h2>

            {/* 🔍 Search & Filter Inputs */}
            <div className="flex flex-wrap gap-4 mb-4 justify-center">
                <input
                    type="text"
                    placeholder="🔎 Search Customer/Product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 w-full md:w-1/3 rounded-md bg-white text-gray-800"
                />
                <input
                    type="number"
                    placeholder="₹ Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border p-2 w-full md:w-1/6 rounded-md bg-white text-gray-800"
                />
                <input
                    type="number"
                    placeholder="₹ Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border p-2 w-full md:w-1/6 rounded-md bg-white text-gray-800"
                />
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 bg-white text-gray-800 rounded-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            <th className="border p-2">Customer</th>
                            <th className="border p-2">Product</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Total (Tax 10%)</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentInvoices.length > 0 ? (
                            currentInvoices.map((invoice) => (
                                <tr key={invoice._id} className="border text-center hover:bg-gray-200 transition">
                                    <td className="border p-2">{invoice.customerName}</td>
                                    <td className="border p-2">{invoice.product}</td>
                                    <td className="border p-2">${invoice.price.toFixed(2)}</td>
                                    <td className="border p-2">${(invoice.price * 1.1).toFixed(2)}</td>
                                    <td className="border p-2 flex justify-center gap-2">
                                        <button className=" bg-green-500 text-white cursor-pointer py-2 px-4 rounded hover:bg-green-600" onClick={() => generatePDF(invoice)}>
                                            Download PDF
                                        </button>

                                        <button onClick={() => handleEditClick(invoice)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer">
                                            ✏ Edit
                                        </button>
                                        <button onClick={() => handleDelete(invoice._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
                                            ❌ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-700">No invoices found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Invoice Modal */}
            {editingInvoice && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-blue-400  text-black p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold mb-2 text-center text-gray-800">✏ Edit Invoice</h2>
                        <form onSubmit={handleEditSubmit} className="space-y-3">
                            <input
                                type="text"
                                value={editingInvoice.customerName}
                                onChange={(e) => setEditingInvoice({ ...editingInvoice, customerName: e.target.value })}
                                required
                                className="border p-2 w-full rounded-md"
                            />
                            <input
                                type="text"
                                value={editingInvoice.product}
                                onChange={(e) => setEditingInvoice({ ...editingInvoice, product: e.target.value })}
                                required
                                className="border p-2 w-full rounded-md"
                            />
                            <input
                                type="number"
                                value={editingInvoice.price}
                                onChange={(e) => setEditingInvoice({ ...editingInvoice, price: e.target.value })}
                                required
                                className="border p-2 w-full rounded-md"
                            />
                            <div className="flex justify-between mt-4">
                                <button type="button" onClick={() => setEditingInvoice(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    💾 Save
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 gap-4">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 "
                    >
                        ⬅ Prev
                    </button>
                    <span className="px-4 py-2">📄 Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 "
                    >
                        Next ➡
                    </button>
                </div>
            )}
        </div>
    );
}

export default InvoiceTable;
