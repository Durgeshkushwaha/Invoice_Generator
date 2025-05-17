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
            const response = await axios.post(`${API_URL}/api/login/create`, { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Only if using cookies/auth
            })
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
                className="bg-gradient-to-br from-indigo-900 to-slate-800 p-4 sm:p-6 md:p-8 w-full mx-auto max-w-[90vw] sm:max-w-md shadow-lg rounded-xl border border-slate-700/50"
            >
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-1 sm:mb-2">Sign In</h2>
                    <p className="text-slate-300 text-xs sm:text-sm">Access your dashboard and manage your account</p>
                </div>

                {/* Demo Credentials - Stacked on mobile */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2 sm:p-3 mb-4 sm:mb-6 border border-slate-700/30">
                    <p className="text-xs sm:text-sm text-slate-300 text-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <span className="block sm:inline font-mono bg-slate-700/50 px-2 py-1 rounded mb-1 sm:mb-0">Demo Account:</span>
                        <span className="block sm:inline font-mono bg-slate-700/50 px-2 py-1 rounded">user@gmail.com</span>
                        <span className="hidden sm:inline mx-1">|</span>
                        <span className="block sm:inline font-mono bg-slate-700/50 px-2 py-1 rounded mt-1 sm:mt-0">pass:123</span>
                    </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 sm:space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1">Email</label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full text-sm sm:text-base bg-slate-800/70 text-white p-2.5 sm:p-3 pl-9 sm:pl-10 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                            <svg className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-4 sm:h-5 w-4 sm:w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                placeholder="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full text-sm sm:text-base bg-slate-800/70 text-white p-2.5 sm:p-3 pl-9 sm:pl-10 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                            <svg className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-4 sm:h-5 w-4 sm:w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1 sm:pt-2">
                        <button
                            type="submit"
                            className="w-full text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors duration-200 flex items-center justify-center cursor-pointer"
                        >
                            <svg className="w-4 sm:w-5 h-4 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Sign In
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center pt-1 sm:pt-2">
                        <p className="text-xs sm:text-sm text-slate-400">
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