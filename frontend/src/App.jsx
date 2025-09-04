
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import InvoiceList from "./pages/InvoiceList";
import CreateInvoice from "./pages/CreateInvoice";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp";
import InvoiceDetail from "./pages/InvoiceDetail";
import SidebarLayout from "./layouts/SidebarLayout";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter basename="/">
                <div className="min-h-screen" style={{
                    background: 'radial-gradient(ellipse at center, rgba(13,27,42,0.95) 0%, rgba(5,12,20,1) 100%)'
                }}>
                    <Navbar />
                    <div className="container mx-auto">
                        <ToastContainer />

                        <Routes>
                            {/* Default route - redirects to login */}
                            <Route path="/" element={<Login />} />

                            {/* Public routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />

                            <Route element={<SidebarLayout />}>
                                <Route element={<ProtectedRoute />}>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/invoices" element={<InvoiceList />} />
                                    <Route path="/create-invoice" element={<CreateInvoice />} />
                                    {/* <Route path="/invoice/:id" element={<InvoiceDetail />} /> */}
                                </Route>
                            </Route>

                            {/* Redirect any unknown paths to login */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>

                    </div>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
