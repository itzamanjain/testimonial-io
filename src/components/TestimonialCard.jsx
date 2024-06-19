import React from 'react';

function TestimonialCard({ customerName, customerCompany, customerReview }) {
  return (
    <div className="bg-gray-800 p-5 rounded-lg">
      <div className="text-lg font-bold mb-2">{customerName}</div>
      <div className="text-sm text-gray-400 mb-2">{customerCompany}</div>
      <div className="text-sm">{customerReview}</div>
    </div>
  );
}

export default TestimonialCard;
