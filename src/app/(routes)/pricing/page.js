"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

function PricingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-10 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-16">Choose Your Plan</h1>
      <div className="flex flex-col md:flex-row gap-10">
        {[
          { title: "Basic", price: "Free", features: ["Collect unlimited testimonials", "Display testimonials on website", "Basic analytics", "Community support"], action: "Sign Up", route: '/signup' },
          { title: "Pro", price: "Pro", features: ["All Basic features", "Advanced analytics", "Custom branding", "Priority support"], action: "Get Started", route: '/signup' },
          { title: "Enterprise", price: "Custom", features: ["All Pro features", "Dedicated account manager", "Custom integrations", "24/7 VIP support"], action: "Contact Sales", route: '/contact' },
        ].map((plan, index) => (
          <div key={index} className="bg-gradient-to-br from-gray-800 to-black shadow-lg rounded-2xl p-8 w-full md:w-1/3 text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">{plan.title}</h2>
            <p className="text-cyan-300 mb-6 text-xl">{plan.price}</p>
            <ul className="text-gray-300 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="mb-3 flex items-center justify-center">
                  <span className="text-indigo-400 mr-2">✓</span> {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => router.push(plan.route)}
              className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-cyan-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              {plan.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingPage;