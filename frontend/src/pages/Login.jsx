import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_BASE_URL;


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/login/create`, { email, password })
            console.log("Response data", response.data);
            console.log("Full API response:", response);

            if (response.data && response.data.user && response.data.token) {
                login(response.data.user, response.data.token);
                toast.success("Login Successful!");
                navigate('/home');
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                error.message ||
                "Login failed. Please try again.";

            if (error.response?.status === 404) {
                toast.error("No user exists with that email address");
            } else if (error.response?.status === 401) {
                toast.error("Invalid password");
            } else {
                toast.error(errorMessage);
            }
            console.error("Login Error:", error);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}
                className="bg-gradient-to-br from-indigo-900 to-slate-800 p-8 w-full mx-auto max-w-md shadow-lg rounded-xl border border-slate-700/50"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-semibold text-white mb-2">Sign In</h2>
                    <p className="text-slate-300 text-sm">Access your dashboard and manage your account</p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-3 mb-6 border border-slate-700/30">
                    <p className="text-sm text-slate-300 text-center">
                        <span className="font-mono bg-slate-700/50 px-2 py-1 rounded">Don't want to create Account, Use:-</span>
                        <span className="font-mono bg-slate-700/50 px-2 py-1 rounded">Email:user@gmail.com</span>
                        <span className="mx-2">|</span>
                        <span className="font-mono bg-slate-700/50 px-2 py-1 rounded">pass:123</span>
                    </p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                placeholder="your@gmail.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800/70 text-white p-3 pl-10 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                            <svg className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                placeholder="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800/70 text-white p-3 pl-10 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                            <svg className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors duration-200 flex items-center justify-center cursor-pointer"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Sign In
                        </button>
                    </div>

                    <div className="text-center pt-2">
                        <p className="text-sm text-slate-400 ">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login