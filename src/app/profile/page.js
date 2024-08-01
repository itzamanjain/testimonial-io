"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TestimonialCard from '../../components/TestimonialCard';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaUserCircle, FaEnvelope, FaSignOutAlt, FaExternalLinkAlt } from 'react-icons/fa';

function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      await axios.get('/api/user/logout');
      toast.success('User logged out successfully!');
      router.push('/signin');
    } catch (error) {
      toast.error('Failed to logout user!');
      console.log('Error:', error.message);
    } finally {
      router.push('/signin');
    }
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/user/profile');
        setUser(response.data.user);
        setTestimonials(response.data.testimonials);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const generateEmbedCode = (testimonialId) => {
    const embedCode = `<iframe src="${process.env.NEXT_PUBLIC_BASE_URL}/embed/testimonial/${testimonialId}" width="100%" height="200" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    toast.success('Embed code copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 md:p-10">
      

      <h2 className="text-3xl font-bold text-center mb-8">Your Profile</h2>

      {user && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
          <div className="flex items-center space-x-4">
            <Image src="/testimonial.png" alt="User Photo" width={80} height={80} className="rounded-full" />
            <div>
              <h3 className="text-2xl font-semibold">{user.fullname}</h3>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="bg-gray-800 w-full h-full p-5 rounded-lg overflow-hidden">
            <TestimonialCard {...testimonial} />
            <button
              onClick={() => generateEmbedCode(testimonial._id)}
              className="w-full rounded-lg px-4 py-2 mt-5 bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
            >
              Get Embed Code
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <Link href="/getTestimonials">
          <button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
            Get Testimonials
          </button>
        </Link>
      </div>
      
      <Toaster />
    </div>
  );
}

export default ProfilePage;