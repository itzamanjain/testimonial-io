"use client"
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { ClipLoader } from "react-spinners";
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { motion } from 'framer-motion';

const Signup = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/signup', formData);
      toast.success('User registered successfully!');
      router.push('/signin')
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to register user!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-black bg-opacity-50 p-10 rounded-xl backdrop-filter backdrop-blur-lg shadow-2xl"
      >
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-white">Join Us</h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Create your account and start collecting testimonials
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {['fullname', 'username', 'email', 'password'].map((field, index) => (
              <div key={field}>
                <label htmlFor={field} className="sr-only">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  id={field}
                  name={field}
                  type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                  autoComplete={field === 'email' ? 'email' : field === 'password' ? 'new-password' : field}
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-800 ${index === 0 ? 'rounded-t-md' : index === 3 ? 'rounded-b-md' : ''}`}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              {loading ? (
                <ClipLoader size={20} color="#ffffff" />
              ) : (
                "Create Account"
              )}
            </motion.button>
          </div>
        </form>
        <div className="text-center">
          <Link className="font-medium text-indigo-400 hover:text-indigo-300 transition duration-150 ease-in-out" href="/signin">
            Already have an account? Sign In
          </Link>
        </div>
      </motion.div>
      <Toaster />
    </div>
  );
};

export default Signup;