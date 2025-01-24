"use client"

import axios from "axios"
import React, { useState, useEffect } from "react"
import TestimonialCard from "../../../components/TestimonialCard"
import toast,{ Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaUserCircle, FaEnvelope, FaSignOutAlt, FaExternalLinkAlt } from "react-icons/fa"
import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa"

function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const totalTestimonials = testimonials.length

  const handleLogout = async () => {
    try {
      await axios.get("/api/user/logout")
      toast.success("User logged out successfully!")
      router.push("/signin")
    } catch (error) {
      toast.error("Failed to logout user!")
      console.log("Error:", error.message)
    } finally {
      router.push("/signin")
    }
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true)
      try {
        const response = await axios.get("/api/user/profile")
        setUser(response.data.user)
        setTestimonials(response.data.testimonials)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  const generateEmbedCode = (testimonialId) => {
    const embedCode = `<iframe src="${process.env.NEXT_PUBLIC_BASE_URL}/embed/testimonial/${testimonialId}" width="100%" height="200" frameborder="0"></iframe>`
    navigator.clipboard.writeText(embedCode)
    toast.success("Embed code copied to clipboard!")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-black">
        <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg">Error: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-center mb-12">Your Profile</h1>
        </motion.div>

        {user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gray-800 p-8 rounded-xl shadow-2xl mb-12"
          >
             <div className="flex items-center space-x-8 mb-8">
              <div className="relative">
                <Image
                  src={user?.avatarUrl || "/placeholder.svg"}
                  alt="User Photo"
                  width={150}
                  height={150}
                  className="rounded-full border-2 border-gray-300"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-4 mb-4">
                  <h2 className="text-2xl font-semibold text-white">{user.username || user.fullname.split(" ")[0]}</h2>
                  <Link href='/edit-profile' className="px-4 py-1 text-sm font-semibold text-black bg-white rounded-md hover:bg-gray-200 transition duration-300">
                    Edit Profile
                  </Link>
                </div>
                <div className="flex space-x-8 mb-4">
                  <span>
                    <strong>{testimonials.length}</strong> Reviews
                  </span>
                  <span>
                    {/* <strong>1.5K</strong> followers */}
                  </span>
                  <span>
                    {/* <strong>1K</strong> following */}
                  </span>
                </div>
                <p className="text-white font-semibold">{user.fullname}</p>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-white">Professional testimonial collector and reviewer</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <Link href="/getTestimonials">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 transform hover:scale-105">
              Get Testimonials
            </button>
          </Link>
        </motion.div>

        {/* <div className="border-t border-gray-700 my-12"></div> */}

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent"
        >
          Reviews
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial._id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Toaster />
    </div>
  )
}

export default ProfilePage

