// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFileInvoiceDollar, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
    const { token } = useAuth();
    const [summary, setSummary] = useState({
        totalInvoices: 4013,
        totalRevenue: 380000,
        totalCustomers: 892,
        recentInvoices: [],
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await axios.get(
                    "https://your-backend-url.com/api/invoices/summary",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setSummary(res.data);
            } catch (error) {
                console.error("Failed to fetch dashboard summary", error);
            }
        };

        fetchSummary();
    }, [token]);

    return (
        <div className="p-14 m-4 bg-cyan-300 rounded-lg">
            <h1 className="text-2xl font-bold text-black mb-6">📊 Dashboard Overview</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                    <FaFileInvoiceDollar className="text-3xl mb-2" />
                    <h2 className="text-xl font-semibold">Total Invoices</h2>
                    <p className="text-2xl">{summary.totalInvoices}</p>
                </div>
                <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg">
                    <FaMoneyBillWave className="text-3xl mb-2" />
                    <h2 className="text-xl font-semibold">Total Revenue</h2>
                    <p className="text-2xl">₹ {summary.totalRevenue}</p>
                </div>
                <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg">
                    <FaUsers className="text-3xl mb-2" />
                    <h2 className="text-xl font-semibold">Total Customers</h2>
                    <p className="text-2xl">{summary.totalCustomers}</p>
                </div>
            </div>

            {/* Recent Invoices Table */}
            <h2 className="text-xl font-semibold text-black mb-4">📅 Recent Invoices</h2>
            <div className="overflow-x-auto bg-gray-800 rounded-lg shadow">
                <table className="min-w-full text-white">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">Customer</th>
                            <th className="px-4 py-2 text-left">Amount</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summary.recentInvoices.map((invoice) => (
                            <tr key={invoice._id} className="border-b border-gray-600">
                                <td className="px-4 py-2">{invoice.customerName}</td>
                                <td className="px-4 py-2">₹ {invoice.total}</td>
                                <td className="px-4 py-2">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm font-semibold ${invoice.status === "Paid" ? "bg-green-500" : "bg-red-500"
                                            }`}
                                    >
                                        {invoice.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {summary.recentInvoices.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-4 py-3 text-center text-gray-400">
                                    No recent invoices
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
