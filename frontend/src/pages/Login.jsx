import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/login/create", { email, password })
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
                className='bg-gradient-to-br from-pink-600 to-green-600 p-4 w-full mx-auto max-w-lg shadow-2xl rounded-2xl mt-15'
            >
                <h2 className='text-2xl font-bold mb-6 text-center text-white'>Login</h2>
                <p className='text-md font-bold mb-2 text-center  text-black'>Don't want to create an account?🙂</p>
                <p className='text-md font-bold mb-2 text-center text-black'>Use (email: user@gmail.com, pass: 123)</p>
                {/* <p className='text-md font-bold mb-2 text-center text-black'>Don't want to create Account?</p> */}
                <div className='space-y-5'>

                    <input
                        type="email"
                        placeholder='email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-3 border-1 rounded-2xl shadow-2xl' />
                    <input
                        type="password"
                        placeholder='password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-3 border-1 rounded-2xl shadow-2xl' />
                    <button
                        type='sumbit'
                        className='w-full bg-blue-600 text-white cursor-pointer p-3 rounded-2xl hover:bg-blue-700 hover:scale-105 transition transform duration-300'
                    >
                        Login
                    </button>
                    <p className='text-center font-bold '>Don't have an Account? <a className='text-decoration-line: underline' href="/signup">SignUp</a> </p>
                </div>
            </form>


        </>
    )
}

export default Login