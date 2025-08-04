import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

// React Icons
import { FaBars, FaTimes, FaFileInvoiceDollar, FaPlus, FaSignOutAlt, FaHome, FaUser } from "react-icons/fa";

function Home() {
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
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-16"} bg-blue-800 text-white shadow-lg`}>
                <div className="flex items-center justify-between p-4">
                    <span className="text-xl font-bold">
                        {isOpen && "Invoice App"}
                    </span>
                    <button onClick={toggleSidebar} className="focus:outline-none text-white">
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
                <nav className="flex flex-col space-y-4 p-4">
                    <Link to="/" className="flex items-center hover:bg-blue-600 px-3 py-2 rounded-lg transition">
                        <FaHome className="mr-2" />
                        {isOpen && "Home"}
                    </Link>
                    <Link to="/invoices" className="flex items-center hover:bg-blue-600 px-3 py-2 rounded-lg transition">
                        <FaFileInvoiceDollar className="mr-2" />
                        {isOpen && "All Invoices"}
                    </Link>
                    <Link to="/create-invoice" className="flex items-center hover:bg-blue-600 px-3 py-2 rounded-lg transition">
                        <FaPlus className="mr-2" />
                        {isOpen && "Create Invoice"}
                    </Link>
                    <Link to="/profile" className="flex items-center hover:bg-blue-600 px-3 py-2 rounded-lg transition">
                        <FaUser className="mr-2" />
                        {isOpen && "Profile"}
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center hover:bg-red-600 px-3 py-2 rounded-lg transition cursor-pointer"
                    >
                        <FaSignOutAlt className="mr-2" />
                        {isOpen && "Logout"}
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-gray-800">Welcome to the Invoice Generator</h1>
                <p className="mt-2 text-gray-600">Easily create and manage invoices with ease.</p>
            </div>
        </div>
    );
}

export default Home;
