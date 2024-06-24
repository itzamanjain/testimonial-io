"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Page = () => {
  const [url, setUrl] = useState('');

  const generateUrl = async () => {
    try {
      const response = await axios.get('api/testimonials/generateUrl');
      setUrl(response.data.generatedUrl);
      console.log('Generated URL:', url);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <h1 className='text-yellow-500 text-2xl text-center mb-4'>
        Copy the URL after generation and share it with your customers to take testimonials
      </h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={generateUrl}
      >
        Generate URL to take Testimonials
      </button>
      {url && <h1 className="text-xl text-white text-center mb-4 break-words">{url}</h1>}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        <Link href="/profile">
          Go To Profile Page 
        </Link>
      </button>
    </div>
  );
};

export default Page;
