"use client"
import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={generateUrl}
      >
        Ask for Testimonials
      </button>
      {url && <h1 className="text-xl text-white ml-4">{url}</h1>}
    </div>
  );
};

export default Page;
