// src/layouts/SidebarLayout.jsx
import React, { useState, useEffect } from "react";
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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Handle window resize to detect mobile devices
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            
            // Auto-close sidebar on mobile when switching to mobile view
            if (mobile) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        };

        window.addEventListener("resize", handleResize);
        
        // Initial check on component mount
        handleResize();
        
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        toast.success("Logout Successfully! 👋");
        setTimeout(() => logout(), 1000);
        navigate("/login");
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Close sidebar when clicking on a link (mobile only)
    const handleLinkClick = () => {
        if (isMobile) {
            setIsOpen(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Mobile overlay */}
            {isMobile && isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={() => setIsOpen(false)}
                />
            )}
            
            {/* Sidebar */}
            <div className={`
                fixed md:relative z-30 transition-all duration-300 
                ${isOpen ? "w-64 translate-x-0" : "w-16 -translate-x-full md:translate-x-0"} 
                bg-blue-800 text-white shadow-lg h-full
            `}>
                <div className="flex items-center justify-between p-4">
                    <span className="text-xl font-bold">{isOpen && "Invoice App"}</span>
                    <button onClick={toggleSidebar} className="focus:outline-none text-white cursor-pointer">
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
                <nav className="flex flex-col space-y-4 p-4">
                    <Link 
                        to="/dashboard" 
                        className="flex items-center hover:bg-blue-700 px-3 py-2 rounded-lg transition"
                        onClick={handleLinkClick}
                    >
                        <FaHome className="mr-2" />
                        {isOpen && "Dashboard"}
                    </Link>
                    <Link 
                        to="/invoices" 
                        className="flex items-center hover:bg-blue-700 px-3 py-2 rounded-lg transition"
                        onClick={handleLinkClick}
                    >
                        <FaFileInvoiceDollar className="mr-2" />
                        {isOpen && "All Invoices"}
                    </Link>
                    <Link 
                        to="/create-invoice" 
                        className="flex items-center hover:bg-blue-700 px-3 py-2 rounded-lg transition"
                        onClick={handleLinkClick}
                    >
                        <FaPlus className="mr-2" />
                        {isOpen && "Create Invoice"}
                    </Link>
                    <Link 
                        to="/profile" 
                        className="flex items-center hover:bg-blue-700 px-3 py-2 rounded-lg transition"
                        onClick={handleLinkClick}
                    >
                        <FaUser className="mr-2" />
                        {isOpen && "Profile"}
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center hover:bg-red-600 px-3 py-2 rounded-lg transition w-full text-left"
                    >
                        <FaSignOutAlt className="mr-2" />
                        {isOpen && "Logout"}
                    </button>
                </nav>
            </div>

            {/* Main Page Content */}
            <div className="flex-1 p-6 w-full transition-all duration-300">
                {/* Mobile menu button when sidebar is closed */}
                {!isOpen && isMobile && (
                    <button 
                        onClick={toggleSidebar}
                        className="fixed bottom-4 right-4 bg-blue-800 text-white p-3 rounded-full shadow-lg z-10 md:hidden"
                    >
                        <FaBars size={20} />
                    </button>
                )}
                
                <Outlet /> {/* Renders nested routes here */}
            </div>
        </div>
    );
}

export default SidebarLayout;