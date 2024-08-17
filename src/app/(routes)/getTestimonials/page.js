"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCopy, FiCheckCircle } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
  const [url, setUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const generateUrl = async () => {
    try {
      const response = await axios.get('api/testimonials/generateUrl');
      setUrl(response.data.generatedUrl);
      toast.success('URL generated successfully!');
    } catch (error) {
      console.log('Error:', error.message);
      toast.error('Failed to generate URL. Please try again.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    toast.success('URL copied to clipboard!');
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gradient-to-br from-gray-900 to-black text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl"
      >
        <h1 className='text-yellow-400 text-3xl font-bold text-center mb-6'>
          Generate Testimonial URL
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Generate a unique URL and share it with your customers to collect testimonials.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
          onClick={generateUrl}
        >
          Generate URL
        </motion.button>
        {url && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <p className="text-lg font-semibold mb-2">Generated URL:</p>
            <div className="flex items-center justify-between bg-gray-600 p-3 rounded">
              <p className="text-sm break-all mr-2">{url}</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={copyToClipboard}
                className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-300 ease-in-out"
              >
                {isCopied ? <FiCheckCircle size={20} /> : <FiCopy size={20} />}
              </motion.button>
            </div>
          </div>
        )}
        <div className="mt-8 text-center">
          <Link href="/profile">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out"
            >
              Go To Profile Page
            </motion.button>
          </Link>
        </div>
      </motion.div>
      <Toaster />
    </div>
  );
};

export default Page;