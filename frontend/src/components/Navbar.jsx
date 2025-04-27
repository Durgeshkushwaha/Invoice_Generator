import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
    const { user, token } = useAuth();

    return (
        <nav className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-semibold hover:text-blue-100 transition-colors">
                    Invoice Generator
                </Link>

                <div className="flex space-x-4">
                    <Link
                        to="/home"
                        className="px-2 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors shadow-sm"
                    >
                        Home
                    </Link>
                    <Link
                        to="/signup"
                        className="px-2 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors shadow-sm"
                    >
                        Sign Up
                    </Link>
                    <Link
                        to="/login"
                        className="px-2 py-2 rounded-md bg-blue-900 hover:bg-blue-700 text-white font-medium transition-colors shadow-sm"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;