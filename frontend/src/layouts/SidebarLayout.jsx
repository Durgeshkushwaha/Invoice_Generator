// src/layouts/SidebarLayout.jsx
import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

import {
    FaBars,
    FaTimes,
    FaFileInvoiceDollar,
    FaPlus,
    FaSignOutAlt,
    FaHome,
    FaUser,
} from "react-icons/fa";

function SidebarLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    const handleLogout = () => {
        toast.success("Logout Successfully! 👋");
        setTimeout(() => logout(), 1000);
        navigate("/login");
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`transition-all duration-300 ${isOpen ? "w-64" : "w-16"} bg-blue-800 text-white shadow-lg`}>
                <div className="flex items-center justify-between p-4">
                    <span className="text-xl font-bold">{isOpen && "Invoice App"}</span>
                    <button onClick={toggleSidebar} className="focus:outline-none text-white cursor-pointer">
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
                <nav className="flex flex-col space-y-4 p-4">
                    <Link to="/dashboard" className="flex items-center hover:bg-blue-700 px-3 py-2 rounded-lg transition">
                        <FaHome className="mr-2" />
                        {isOpen && "Dashboard"}
                    </Link>
                    <Link to="/invoices" className="flex items-center hover:bg-blue-700 px-3 py-2 rounded-lg transition">
                        <FaFileInvoiceDollar className="mr-2" />
                        {isOpen && "All Invoices"}
                    </Link>
                    <Link to="/create-invoice" className="flex items-center hover:bg-blue-700 px-3 py-2 rounded-lg transition">
                        <FaPlus className="mr-2" />
                        {isOpen && "Create Invoice"}
                    </Link>
                    <Link to="/profile" className="flex items-center hover:bg-blue-700 px-3 py-2 rounded-lg transition">
                        <FaUser className="mr-2" />
                        {isOpen && "Profile"}
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center hover:bg-red-600 px-3 py-2 rounded-lg transition"
                    >
                        <FaSignOutAlt className="mr-2" />
                        {isOpen && "Logout"}
                    </button>
                </nav>
            </div>

            {/* Main Page Content */}
            <div className="flex-1 p-6">
                <Outlet /> {/* Renders nested routes here */}
            </div>
        </div>
    );
}

export default SidebarLayout;
