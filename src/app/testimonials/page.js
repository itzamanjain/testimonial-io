"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { ClipLoader } from "react-spinners";

function Page() {
    const [customerReviews, setCustomerReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        customerPosition: '',
        customerCompany: '',
        customerSocialId: '',
        customerReview: '',
        testimonialGivenTo: ''
    });

    useEffect(() => {
        // Fetch testimonialGivenTo from query parameters
        const queryParams = new URLSearchParams(window.location.search);
        const testimonialGivenTo = queryParams.get('testimonialGivenTo');
        setFormData((prevFormData) => ({
            ...prevFormData,
            testimonialGivenTo: testimonialGivenTo || ''
        }));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCustomerReviewSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true); // Set loading state to true
        try {
            await axios.post('/api/testimonials/create', formData);
            toast.success('Your review submitted successfully!');
            // Add the submitted data to the customerReviews state
            setCustomerReviews([...customerReviews, formData]);
            console.log('customerReview submitted:', formData);
            // Clear the form fields after submission
            setFormData({
                customerName: '',
                customerPosition: '',
                customerCompany: '',
                customerSocialId: '',
                customerReview: '',
                testimonialGivenTo: '',
            });
        } catch (error) {
            console.error(error);
            toast.error('Failed to submit customer review');
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-10 flex justify-center items-center">
                <form onSubmit={handleCustomerReviewSubmit} className="space-y-4 mb-10 w-full max-w-lg">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Name</label>
                        <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Position</label>
                        <input
                            type="text"
                            name="customerPosition"
                            value={formData.customerPosition}
                            onChange={handleChange}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Company</label>
                        <input
                            type="text"
                            name="customerCompany"
                            value={formData.customerCompany}
                            onChange={handleChange}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Online Presence</label>
                        <input
                            type="text"
                            name="customerSocialId"
                            value={formData.customerSocialId}
                            onChange={handleChange}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Your Review</label>
                        <textarea
                            name="customerReview"
                            value={formData.customerReview}
                            onChange={handleChange}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 ${!formData.customerName || !formData.customerPosition || !formData.customerCompany || !formData.customerReview ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={!formData.customerName || !formData.customerPosition || !formData.customerCompany || !formData.customerReview}
                        onClick={(e) => {
                            if (!formData.customerName || !formData.customerPosition || !formData.customerCompany || !formData.customerReview) {
                                e.preventDefault();
                                alert("Please fill all details");
                            }
                        }}
                    >
                        {loading ? (
                            <ClipLoader size={20} color="#ffffff" />
                        ) : (
                            "Submit Review"
                        )}
                    </button>
                </form>

                <Toaster />
            </div>
        </>
    )
}

export default Page;

















// "use client"
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { ClipLoader } from "react-spinners";


// function Page() {


   

//     const UrltestimonialGivenTo = new URLSearchParams(window.location.search).get('testimonialGivenTo');
//     console.log('testimonialGivenTo:', UrltestimonialGivenTo);






//     const [customerReviews, setCustomerReviews] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         customerName: '',
//         customerPosition: '',
//         customerCompany: '',
//         customerSocialId: '',
//         customerReview: '',
//         testimonialGivenTo: UrltestimonialGivenTo,
//     });


//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleCustomerReviewSubmit = async (e) => {
//         e.preventDefault(); // Prevent default form submission
//         setLoading(true); // Set loading state to true
//         try {
//             await axios.post('/api/testimonials/create', formData);
//             toast.success('Your review submitted successfully!');
//             // Add the submitted data to the customerReviews state
//             setCustomerReviews([...customerReviews, formData]);
//             console.log('customerReview submitted:', formData);
//             // Clear the form fields after submission
//             setFormData({
//                 customerName: '',
//                 customerPosition: '',
//                 customerCompany: '',
//                 customerSocialId: '',
//                 customerReview: '',
//                 testimonialGivenTo: '',
//             });
//         } catch (error) {
//             console.error(error);
//             toast.error('Failed to submit customer review');
//         } finally {
//             setLoading(false); // Set loading state to false
//         }
//     };

//     return (
//         <>
//             <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-10 flex justify-center items-center">
//             <form onSubmit={handleCustomerReviewSubmit} className="space-y-4 mb-10 w-full max-w-lg">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-300">Name</label>
//                     <input
//                         type="text"
//                         name="customerName"
//                         value={formData.customerName}
//                         onChange={handleChange}
//                         className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-300">Position</label>
//                     <input
//                         type="text"
//                         name="customerPosition"
//                         value={formData.customerPosition}
//                         onChange={handleChange}
//                         className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-300">Company</label>
//                     <input
//                         type="text"
//                         name="customerCompany"
//                         value={formData.customerCompany}
//                         onChange={handleChange}
//                         className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-300">Online Presence</label>
//                     <input
//                         type="text"
//                         name="customerSocialId"
//                         value={formData.customerSocialId}
//                         onChange={handleChange}
//                         className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-300">Your Review</label>
//                     <textarea
//                         name="customerReview"
//                         value={formData.customerReview}
//                         onChange={handleChange}
//                         className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className={`px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 ${!formData.customerName || !formData.customerPosition || !formData.customerCompany || !formData.customerReview  ? 'cursor-not-allowed opacity-50' : ''}`}
//                     disabled={!formData.customerName || !formData.customerPosition || !formData.customerCompany || !formData.customerReview  }
//                     onClick={(e) => {
//                         if (!formData.customerName || !formData.customerPosition || !formData.customerCompany || !formData.customerReview  ) {
//                             e.preventDefault();
//                             alert("Please fill all details");
//                         }
//                     }}
//                 >
//                     {loading ? (
//                         <ClipLoader size={20} color="#ffffff" />
//                     ) : (
//                         "Submit Review"
//                     )}
//                 </button>
//             </form>
            
//             <Toaster />
//             </div>
//         </>
//     )
// }

// export default Page