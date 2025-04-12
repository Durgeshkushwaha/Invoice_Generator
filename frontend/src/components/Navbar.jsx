import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';


function Navbar() {

    const { user, token } = useAuth();
    // function refreshPage() {
    //     if (!user || !token) { // only refresh when user not logged in
    //         setTimeout(() => window.location.reload(), 5000) // Used this to reset the toastshown=false in protectedRoute comp
    //     }
    // }
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between ">
                <a href="/"><h1 className="text-xl font-bold">Invoice Generator</h1></a>
                <div className="space-x-4">
                    <Link to="/home" className="hover:underline bg-red-700 p-2 rounded-full">Home</Link>
                    <Link to="/signup" className="hover:underline bg-red-700 p-2 rounded-full">SignUp</Link>
                    <Link to="/login" className="hover:underline bg-red-700 p-2 rounded-full">Login</Link>
                    {/* <Link to="/invoices" className="hover:underline  bg-red-500 p-2 rounded-3xl">Invoices</Link>
                    <Link to="/create-invoice" className="hover:underline  bg-red-500 p-2 rounded-3xl">Create Invoice</Link> */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
