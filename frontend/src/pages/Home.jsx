import React from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';



function Home() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // logout();
        toast.success('Logout Successfully! 👋')
        setTimeout(() => logout(), 1000); // Show toast first, then logout
        navigate('/login');
    }
   
    return (
        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold text-white">Welcome to the Invoice Generator</h1>
            <p className="mt-2 text-gray-400">Easily create and manage invoices.</p>
            <div className="space-x-4 mt-10">
                <Link to="/invoices" className="hover:bg-blue-700  text-white   bg-blue-600 p-3 rounded-lg">Invoices</Link>
                <Link to="/create-invoice" className="hover:bg-blue-700 text-white  bg-blue-600 p-3 rounded-lg">Create Invoice</Link>
                <button onClick={() => handleLogout()} className="hover:bg-red-700 text-white  bg-red-600 p-3 rounded-lg cursor-pointer">LogOut</button>
            </div>
        </div>
    );
}

export default Home;
