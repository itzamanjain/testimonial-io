"use client"
import React from 'react';
import Test from '../components/Test';
import Link from 'next/link';

function Page() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-4 py-12 md:py-24">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Collect Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Testimonials</span> &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Integrate</span>
          <span className="text-3xl md:text-5xl"> in</span> Websites
        </h1>
        <p className="text-gray-300 mt-6 text-xl">
          Elevate your brand with authentic stories. Seamlessly collect and showcase testimonials that convert.
        </p>
      </div>
      <div className="flex justify-center mt-12">
        <Link href='/signup'>
        <button
          type="button"
          className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white font-bold py-3 px-8 rounded-full text-lg hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Get Your First Testimonials
        </button>
        </Link>
      </div>
      <div className="mt-16">
        <Test />
      </div>
    </div>
  );
}

export default Page;