import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import axios from 'axios';
import {FaPen} from 'react-icons/fa'

function TestimonialCard({ customerName, customerCompany, customerSocialId, customerReview, customerPosition, avatarUrl }) {
  
  const handleDelete = async ({userId,testimonialId}) => {
    const res = await axios.delete('/api/testimonials/delete',{userId,testimonialId})

  }
  
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white w-full p-6 max-w-sm mx-auto rounded-xl shadow-lg overflow-hidden border border-gray-200"
    >
      <div className="flex items-center space-x-4 mb-4">
        <motion.div 
          className="flex-shrink-0 relative"
        >
          <Image 
            className="object-cover rounded-full border-2 border-gray-300 shadow-sm" 
            src={avatarUrl || "/testimonial.png"} 
            width={80} 
            height={80} 
            alt={customerName} 
          />
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{customerName}</h3>
          <p className="text-gray-500 text-sm">{customerPosition}</p>
          <p className="text-gray-400 text-xs">@{customerSocialId}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">&ldquo;{customerReview}&rdquo;</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-gray-500 text-xs">{customerCompany}</p>
        <motion.div 
          whileHover={{ scale: 1.2 }}
          className="text-yellow-500"
        >
          ★★★★★
        </motion.div>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;
