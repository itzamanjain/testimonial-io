import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

function TestimonialCard({ customerName, customerCompany, customerSocialId, customerReview, customerPosition, customerImage }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-purple-600 to-indigo-700 w-full p-6 max-w-sm mx-auto rounded-xl shadow-2xl overflow-hidden"
    >
      <div className="flex items-center space-x-4 mb-4">
        <motion.div 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0 relative"
        >
          <Image 
            className="object-cover rounded-full border-4 border-white shadow-lg" 
            src={customerImage || "/testimonial.png"} 
            width={80} 
            height={80} 
            alt={customerName} 
          />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-white">{customerName}</h3>
          <p className="text-indigo-200 font-medium">{customerPosition}</p>
          <p className="text-indigo-300 text-sm">@{customerSocialId}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-white italic">&ldquo;{customerReview}&rdquo;</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-indigo-200 text-sm">{customerCompany}</p>
        <motion.div 
          whileHover={{ scale: 1.2 }}
          className="text-yellow-300"
        >
          ★★★★★
        </motion.div>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;