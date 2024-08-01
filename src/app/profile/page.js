"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TestimonialCard from '../../components/TestimonialCard'; // Adjust the path as per your file structure
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

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
    }finally{
      router.push('/signin');
    }
  }

  useEffect(() => {
    // Function to fetch user profile and testimonials
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/user/profile');
        setUser(response.data.user); // Adjust the property name according to your response structure
        setTestimonials(response.data.testimonials); // Adjust the property name according to your response structure
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-10">
      <h1 className="text-3xl text-white text-center mb-5">Profile page</h1>
      {user && (
        <div className="bg-gray-800 p-5 rounded-lg mb-10">
          <div className="flex items-center">
            {/* Assuming you have a photo for the user */}
            <div className="w-20 h-20 rounded-full overflow-hidden mr-5">
              <Image src="/vercel.svg" alt="User Photo" className="w-full h-full object-cover" width={40} height={50}/>
            </div>
            <div>
              <div className="text-2xl font-bold">{user.fullname}</div>
              <div className="text-sm text-gray-400">{user.email}</div>
              {/* Other user details you want to display */}
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial._id} {...testimonial} />
        ))}
      </div>
     
      <button className='px-4 mt-10 py-2 bg-yellow-700 text-white rounded-md shadow-sm hover:bg-yellow-500'>
      <Link  href='/getTestimonials'>Get Testimonials</Link>
      
      </button>
      <br/>
      <button onClick={handleLogout} className="px-4 mt-10 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700">Logout</button>
    
    
    </div>
  );
}

export default ProfilePage;
