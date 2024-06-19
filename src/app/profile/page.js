"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TestimonialCard from '../../components/TestimonialCard'; // Adjust the path as per your file structure

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl text-white text-center mb-5">Profile page</h1>
      {user && (
        <div className="bg-gray-800 p-5 rounded-lg mb-10">
          <div className="flex items-center">
            {/* Assuming you have a photo for the user */}
            <div className="w-20 h-20 rounded-full overflow-hidden mr-5">
              <img src={user.photo} alt="User Photo" className="w-full h-full object-cover" />
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
    </div>
  );
}

export default ProfilePage;
