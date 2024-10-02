import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import axios from 'axios';
import {FaPen, FaStar} from 'react-icons/fa'

function TestimonialCard({ customerName, customerCompany, customerSocialId, customerReview, customerPosition, avatarUrl ,rating}) {
  
  const handleDelete = async ({userId,testimonialId}) => {
    const res = await axios.delete('/api/testimonials/delete',{userId,testimonialId})

  }
  
  return (<motion.div 
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    className="bg-white w-full p-6 max-w-md mx-auto rounded-2xl shadow-lg overflow-hidden border border-gray-200"
  >
    <div className="flex items-center space-x-6 mb-6">
      <motion.div 
        className="flex-shrink-0 relative"
        whileHover={{ scale: 1.1 }}
      >
        <Image 
          className="object-cover rounded-full border-4 border-yellow-400 shadow-lg" 
          src={avatarUrl || "/testimonial.png"} 
          width={80} 
          height={80} 
          alt={customerName} 
        />
      </motion.div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{customerName}</h3>
        <p className="text-gray-500 text-md ">{customerPosition} at {customerCompany}</p>
        <p className="text-gray-400 text">@{customerSocialId}</p>
      </div>
    </div>
    <div className="mt-4">
      <p className="text-gray-600 text leading-relaxed">&ldquo;{customerReview}&rdquo;</p>
    </div>
    <div className="mt-6 flex justify-between items-center">
      
      <motion.div 
        whileHover={{ scale: 1.2 }}
        className="text-yellow-500  flex space-x-1"
      >
        {rating && [...Array(rating)].map((_, i) => (
          <FaStar key={i} />
        ))}
      </motion.div>
    </div>
  </motion.div>
    );
}

export default TestimonialCard;
