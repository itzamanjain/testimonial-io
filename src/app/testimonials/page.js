"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { ClipLoader } from "react-spinners";
import { motion } from 'framer-motion';

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
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">Share Your Experience</h2>
                <form onSubmit={handleCustomerReviewSubmit} className="space-y-6">
                    {[
                        { name: "customerName", label: "Name", type: "text" },
                        { name: "customerPosition", label: "Position", type: "text" },
                        { name: "customerCompany", label: "Company", type: "text" },
                        { name: "customerSocialId", label: "Online Presence", type: "text" },
                        { name: "customerReview", label: "Your Review", type: "textarea" }
                    ].map((field) => (
                        <motion.div key={field.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <label className="block text-sm font-medium text-blue-300 mb-1">{field.label}</label>
                            {field.type === "textarea" ? (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-blue-500/30 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 text-white"
                                    rows="4"
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-blue-500/30 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out p-2 text-white"
                                />
                            )}
                        </motion.div>
                    ))}
                    <motion.button
                        type="submit"
                        className={`w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200 ease-in-out ${!formData.customerName || !formData.customerPosition || !formData.customerCompany || !formData.customerReview ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={!formData.customerName || !formData.customerPosition || !formData.customerCompany || !formData.customerReview}
                        onClick={(e) => {
                            if (!formData.customerName || !formData.customerPosition || !formData.customerCompany || !formData.customerReview) {
                                e.preventDefault();
                                toast.error("Please fill all required fields");
                            }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {loading ? (
                            <ClipLoader size={20} color="#ffffff" />
                        ) : (
                            "Submit Review"
                        )}
                    </motion.button>
                </form>
            </motion.div>
            <Toaster />
        </div>
        </>
    )
}

export default Page;

