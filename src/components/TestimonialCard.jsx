import React from 'react';
import Image from 'next/image';

function TestimonialCard({ customerName, customerCompany,customerSocialId, customerReview, customerPosition, customerImage }) {
  return (
    <div className="bg-white w-full p-6 max-w-sm mx-auto rounded-lg shadow-lg flex items-center space-x-4">
      <div className="flex-shrink-0">
        <Image className="object-cover rounded-full" src="/testimonial.png" width={70} height={70} alt={customerName} />
      </div>
      <div>
        <div className="text-xl font-medium text-black">{customerName}</div>
        <p className="text-gray-500">{customerPosition} at {customerCompany}</p>
        <p className="text-gray-500">@{customerSocialId}</p>
        <p className="mt-2 text-gray-600">{customerReview}</p>
      </div>
    </div>
  );
}

export default TestimonialCard;
