"use client"
import React from 'react';
import Test from '../components/Test';
import Link from 'next/link';
import Image from 'next/image';

function Page() {
  return (
   <>
       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-4 py-12 md:py-24">
      {/* Hero Section */}
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
      </div>

      {/* Featured Section */}
      <div className="mt-32 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Why Choose Us?
        </h2>
        <p className="text-gray-300 mt-6 text-lg">
          Discover the benefits of using our platform to collect and showcase testimonials.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <Image
              src="/easy-to-use.png"
              alt="Easy to Use"
              width={80}
              height={80}
              className="mx-auto rounded-xl"
            />
            <h3 className="text-xl font-bold text-yellow-400 mt-4">Easy to Use</h3>
            <p className="text-gray-300 mt-2">Our platform is user-friendly and intuitive, making it easy to collect testimonials from your clients.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <Image
              src="/customizable.png"
              alt="Customizable"
              width={80}
              height={80}
              className="mx-auto rounded-xl"
            />
            <h3 className="text-xl font-bold text-yellow-400 mt-4">Highly Customizable</h3>
            <p className="text-gray-300 mt-2">Tailor the look and feel of your testimonials to match your brands identity.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <Image
              src="/integration.png"
              alt="Integration"
              width={80}
              height={80}
              className="mx-auto rounded-xl"
            />
            <h3 className="text-xl font-bold text-yellow-400 mt-4">Seamless Integration</h3>
            <p className="text-gray-300 mt-2">Easily integrate testimonials into your website with just a few clicks.</p>
          </div>
        </div>

      </div>

      {/* Testimonials Showcase Section */}
      <div className="mt-32">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white">What Our Clients Say</h2>
        <div className="mt-16">
          <Test />
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-32 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white">Ready to Get Started?</h2>
        <p className="text-gray-300 mt-6 text-lg">
          Join our platform and start collecting testimonials that will boost your brands credibility.
        </p>
        <div className="flex justify-center mt-12">
          <Link href='/signup'>
            <button
              type="button"
              className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white font-bold py-3 px-8 rounded-full text-lg hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Sign Up Now
            </button>
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      

    </div>
    <div className="mt-32 text-center py-12 bg-gray-950 ">
    <p className="text-gray-500">
      &copy; {new Date().getFullYear()} Endorse Collect. All rights reserved.
    </p>
    <div className="mt-4 flex justify-center space-x-6">
      <a href="/terms" className="text-gray-500 hover:text-gray-400">
        Terms of Service
      </a>
      <a href="/privacy" className="text-gray-500 hover:text-gray-400">
        Privacy Policy
      </a>
      <a href="/contact" className="text-gray-500 hover:text-gray-400">
        Contact Us
      </a>
    </div>
  </div>
   </>
  );
}

export default Page;
