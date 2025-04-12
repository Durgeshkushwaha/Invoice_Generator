import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_BASE_URL;



const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", { name, email, password }); // Log the data

    try {
      const response = await axios.post(`${API_URL}/api/signup/create`, { name, email, password });
      console.log("ress", response.data)
      if (response.data && response.data.user && response.data.token) {
        // Auto-login after successful signup
        login(response.data.user, response.data.token);
        toast.success("Account created successfully!");
        navigate('/home');
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message ||
        error.message ||
        "Signup failed. Please try again.";

      if (error.response?.status === 403) {
        toast.error("User with this email already exists");
      } else {
        toast.error(errorMessage);
      }
      console.error("Signup Error:", error);

    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}
        className='bg-gradient-to-br from-green-600 to-pink-600 p-4 w-full mx-auto max-w-lg shadow-2xl rounded-2xl mt-15'
      >
        <h2 className='text-2xl font-bold mb-6 text-center text-white'>SignUp</h2>
        <div className='space-y-5'>
          <input
            type="text"
            placeholder='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='w-full p-3 border-1 rounded-2xl shadow-2xl' />
          <input
            type="email"
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full p-3 border-1 rounded-2xl shadow-2xl' />
          <input
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full p-3 border-1 rounded-2xl shadow-2xl' />
          <button
            type='submit'
            className='w-full bg-blue-600 text-white cursor-pointer p-3 rounded-2xl hover:bg-blue-700 hover:scale-105 transition transform duration-300'
          >
            Signup
          </button>
          <p className='text-center font-bold'>Already have an Account? <a className='text-decoration-line: underline' href="/login">Login</a> </p>
        </div>
      </form>

    </>
  )
}

export default SignUp