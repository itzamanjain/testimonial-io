import Link from 'next/link';
import React from 'react';

function Page() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-10 flex flex-col items-center">
        <h1 className="text-6xl font-extrabold text-center mt-5 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">About Us</h1>
        <div className="max-w-2xl text-center mb-8 text-lg leading-relaxed">
          Endorse Collect is your gateway to irresistible testimonials. We empower you to seduce potential customers with authentic praise from your satisfied clients. Our sleek, intuitive platform lets you craft stunning testimonial pages that will leave visitors weak at the knees. Collect and showcase glowing reviews effortlessly, building trust and desire for your brand. Ready to make your website impossible to resist? Sign up now and watch your conversions soar!
        </div>
        <hr className="w-full max-w-2xl mb-8 border-pink-400" />
        <div className="max-w-2xl text-2xl text-center italic font-light">
          &quot;We are in our sultry startup phase, working tirelessly to perfect your experience. Stay tuned for a platform that will make your testimonials too hot to handle.&quot;
        </div>
        
        <Link href='signup'>
        <button className="mt-12 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full hover:from-pink-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105">
          Get Started
        </button>
        </Link>
      </div>
    </>
  );
}

export default Page;