import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
    const { user, token, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-3 sm:p-4 shadow-lg">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
                {/* Logo/Brand */}
                <Link
                    to="/"
                    className="text-xl sm:text-2xl font-semibold hover:text-blue-100 transition-colors whitespace-nowrap"
                >
                    Invoice Generator
                </Link>

                {/* Navigation Links - Stack on mobile */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <Link
                        to="/home"
                        className="px-3 py-2 text-sm sm:text-base rounded-lg bg-blue-900/80 hover:bg-blue-800 text-white font-medium transition-colors shadow-sm flex items-center justify-center flex-1 sm:flex-initial min-w-[100px]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                    </Link>

                    {!user && (
                        <>
                            <Link
                                to="/signup"
                                className="px-3 py-2 text-sm sm:text-base rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors shadow-sm flex items-center justify-center flex-1 sm:flex-initial min-w-[100px]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                Sign Up
                            </Link>

                            <Link
                                to="/login"
                                className="px-3 py-2 text-sm sm:text-base rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium transition-colors shadow-sm flex items-center justify-center flex-1 sm:flex-initial min-w-[100px]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Login
                            </Link>
                        </>
                    )}

                    {/* User Account Dropdown */}
                    {user && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="px-3 py-3 text-sm sm:text-base cursor-pointer rounded-lg bg-gray-800/80 hover:bg-gray-900 text-white font-medium transition-colors shadow-sm flex items-center justify-center flex-1 sm:flex-initial min-w-[40px]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>

                            </button>


                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        {user.name && <p className="text-sm text-gray-700 font-medium">{user.name}</p>}
                                        <p className="text-xs text-gray-700 ">{user.email}</p>
                                    </div>
                                    <Link
                                        to="/account"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Account Settings
                                    </Link>
                                    <Link
                                        to="/invoices"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        My Invoices
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsDropdownOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm font-bold cursor-pointer text-red-600 hover:bg-gray-300"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;