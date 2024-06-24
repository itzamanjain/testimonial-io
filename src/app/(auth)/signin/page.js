// pages/signup.js
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
import { ClipLoader } from "react-spinners";
import {useRouter} from 'next/navigation'
import Link from 'next/link';

const Signup = () => {
  const router = useRouter()
  const [loading , setLoading] = useState(false)
  const [formData, setFormData] = useState({
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
      const response = await axios.post('/api/user/signin', formData);
      toast.success('User Login successfully!');
      router.push('/profile')
      console.log(response.data); // handle success response

    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to register user!');
      // handle error
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">sign in</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            
            
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 bg-black py-2 border border-gray-300 placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 bg-black border border-gray-300 placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              "sign in"
            )}
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link className="font-medium text-indigo-600 hover:text-indigo-500" href="/signup">
            
            Dont have an account ? Sign Up
          </Link>
          </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
