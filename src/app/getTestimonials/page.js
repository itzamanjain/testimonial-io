"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { ClipLoader } from "react-spinners";
import { getDataFromToken } from '../../helper/getDataFromToken';

// Function to get user ID from token
const getUserId = async () => {
  const user = await getDataFromToken();
  return user._id;
}

function Page() {
  

  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    }
    fetchUserId();
  }, []);

  

  
  const newuserId = '66713d188ec5def1a1861bfc';
  return (
    
    <>
      <div className="min-h-screen bg-black text-white p-10 flex justify-center items-center">
        
        <button>
          <a href={`http://localhost:3000/testimonials/submit/?testimonialGivenTo=${newuserId}`}>Ask for testimonial</a>
        </button>
      </div>

    </>
  );
}

export default Page;
