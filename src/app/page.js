"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Test from '../components/Test';

function Page() {
  const router = useRouter();
  return (
    <div className="px-4 py-8 md:py-16">
      <div className="text-center ">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Collect Your{' '}
          <span className="text-yellow-500">Testimonials</span> &{' '}
          <span className="text-yellow-500">Integrate </span> <br />
          <span>in </span>  Websites
        </h1>
        <p className="text-gray-300 mt-4">
          Collect and display testimonials on your website to build trust with your audience.
        </p>
      </div>
      <div className="flex justify-center mt-8 ">
        <button
          type="button"
          onClick={() => router.push('/signup')}
          className="bg-yellow-800  hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Get Your First Testimonials
        </button>
      </div>
      <Test />
    </div>
  );
}

export default Page;
