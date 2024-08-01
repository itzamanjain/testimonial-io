"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

function PricingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-10">Pricing Plans</h1>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Free</h2>
          <p className="text-gray-600 mb-6">Perfect for individuals and small teams.</p>
          <ul className="text-gray-600 mb-6">
            <li className="mb-2">✅ Collect unlimited testimonials</li>
            <li className="mb-2">✅ Display testimonials on  website</li>
            <li className="mb-2">✅ Basic analytics</li>
            <li className="mb-2">✅ Community support</li>
          </ul>
          <button
            type="button"
            onClick={() => router.push('/signUp')}
            className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up for Free
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pro</h2>
          <p className="text-gray-600 mb-6">Ideal for growing businesses.</p>
          <ul className="text-gray-600 mb-6">
            <li className="mb-2">✅ All Free features</li>
            <li className="mb-2">✅ Advanced analytics</li>
            <li className="mb-2">✅ Custom branding</li>
            <li className="mb-2">✅ Priority support</li>
          </ul>
          <button
            type="button"
            onClick={() => router.push('/signUp')}
            className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Enterprise</h2>
          <p className="text-gray-600 mb-6">For large organizations.</p>
          <ul className="text-gray-600 mb-6">
            <li className="mb-2">✅ All Pro features</li>
            <li className="mb-2">✅ Dedicated account manager</li>
            <li className="mb-2">✅ Custom integrations</li>
            <li className="mb-2">✅ 24/7 support</li>
          </ul>
          <button
            type="button"
            onClick={() => router.push('/contactSales')}
            className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
