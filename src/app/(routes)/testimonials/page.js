"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { ClipLoader } from "react-spinners"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Upload, User, Building, MapPin, MessageSquare, CheckCircle } from "lucide-react"

// Star Rating Component
const StarRating = ({ rating, onRatingChange, size = 24 }) => {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Star
            size={size}
            className={`transition-all duration-200 ${
              star <= (hoverRating || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-400 hover:text-yellow-300"
            }`}
          />
        </motion.button>
      ))}
      <span className="ml-2 text-sm text-blue-300">
        {rating > 0 ? `${rating} star${rating !== 1 ? "s" : ""}` : "No rating"}
      </span>
    </div>
  )
}

// Input Field Component
const InputField = ({ icon: Icon, label, name, type = "text", value, onChange, required = false, rows }) => (
  <motion.div className="space-y-2" whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
    <label className="flex items-center gap-2 text-sm font-medium text-blue-300">
      <Icon size={16} />
      {label}
      {required && <span className="text-red-400">*</span>}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows || 4}
        required={required}
        className="w-full bg-white/5 border border-blue-500/30 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:ring-opacity-50 transition-all duration-200 ease-in-out p-3 text-white placeholder-gray-400 resize-none"
        placeholder={`Enter your ${label.toLowerCase()}...`}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-white/5 border border-blue-500/30 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:ring-opacity-50 transition-all duration-200 ease-in-out p-3 text-white placeholder-gray-400"
        placeholder={`Enter your ${label.toLowerCase()}...`}
      />
    )}
  </motion.div>
)

// File Upload Component
const FileUpload = ({ onChange, file }) => {
  const [dragOver, setDragOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onChange({ target: { name: "avatar", files } })
    }
  }

  return (
    <motion.div className="space-y-2" whileHover={{ scale: 1.01 }}>
      <label className="flex items-center gap-2 text-sm font-medium text-blue-300">
        <Upload size={16} />
        Upload Avatar
      </label>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
          dragOver ? "border-blue-400 bg-blue-500/10" : "border-blue-500/30 hover:border-blue-400/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Upload className="mx-auto mb-2 text-blue-400" size={24} />
        <p className="text-sm text-gray-300">{file ? file.name : "Drop your image here or click to browse"}</p>
        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
      </div>
    </motion.div>
  )
}

function Page() {
  const [customerReviews, setCustomerReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    customerName: "",
    customerPosition: "",
    customerCompany: "",
    customerSocialId: "",
    customerReview: "",
    testimonialGivenTo: "",
    rating: 0,
    avatar: null,
  })

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const testimonialGivenTo = queryParams.get("testimonialGivenTo")
    setFormData((prevFormData) => ({
      ...prevFormData,
      testimonialGivenTo: testimonialGivenTo || "",
    }))
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "avatar") {
      setFormData({
        ...formData,
        avatar: files[0],
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating: rating,
    })
  }

  const isFormValid = () => {
    return (
      formData.customerName &&
      formData.customerPosition &&
      formData.customerCompany &&
      formData.customerReview &&
      formData.rating > 0
    )
  }

  const handleCustomerReviewSubmit = async (e) => {
    e.preventDefault()

    if (!isFormValid()) {
      toast.error("Please fill all required fields and provide a rating")
      return
    }

    setLoading(true)

    try {
      const submitData = new FormData()
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key])
      })

      await axios.post("/api/testimonials/create", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success("Your review submitted successfully!")
      setCustomerReviews([...customerReviews, formData])
      setSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          customerName: "",
          customerPosition: "",
          customerCompany: "",
          customerSocialId: "",
          customerReview: "",
          testimonialGivenTo: formData.testimonialGivenTo, // Keep this value
          rating: 0,
          avatar: null,
        })
      }, 3000)
    } catch (error) {
      console.error(error)
      toast.error("Failed to submit customer review. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white p-4 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 text-center">
          <motion.h2
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Share Your Experience
          </motion.h2>
          <p className="text-blue-200/80">Your feedback helps us improve and grow</p>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-12"
              >
                <CheckCircle className="mx-auto mb-4 text-green-400" size={64} />
                <h3 className="text-2xl font-bold text-green-400 mb-2">Thank You!</h3>
                <p className="text-gray-300">Your review has been submitted successfully.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleCustomerReviewSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    icon={User}
                    label="Full Name"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    icon={Building}
                    label="Position"
                    name="customerPosition"
                    value={formData.customerPosition}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    icon={Building}
                    label="Company"
                    name="customerCompany"
                    value={formData.customerCompany}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    icon={MapPin}
                    label="LinkedIn ID"
                    name="customerSocialId"
                    value={formData.customerSocialId}
                    onChange={handleChange}
                  />
                </div>

                <InputField
                  icon={MessageSquare}
                  label="Your Review"
                  name="customerReview"
                  type="textarea"
                  value={formData.customerReview}
                  onChange={handleChange}
                  rows={5}
                  required
                />

                <motion.div className="space-y-2" whileHover={{ scale: 1.01 }}>
                  <label className="flex items-center gap-2 text-sm font-medium text-blue-300">
                    <Star size={16} />
                    Rating <span className="text-red-400">*</span>
                  </label>
                  <div className="p-4 bg-white/5 rounded-lg border border-blue-500/30">
                    <StarRating rating={formData.rating} onRatingChange={handleRatingChange} size={28} />
                  </div>
                </motion.div>

                <FileUpload onChange={handleChange} file={formData.avatar} />

                <motion.button
                  type="submit"
                  className={`w-full px-6 py-4 bg-black text-white rounded-lg shadow-lg font-semibold text-lg transition-all duration-200 ${
                    !isFormValid() || loading
                      ? "cursor-not-allowed opacity-50"
                      : "hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                  }`}
                  disabled={!isFormValid() || loading}
                  whileHover={isFormValid() && !loading ? { scale: 1.02 } : {}}
                  whileTap={isFormValid() && !loading ? { scale: 0.98 } : {}}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <ClipLoader size={20} color="#ffffff" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit Review"
                  )}
                </motion.button>

                {!isFormValid() && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-400 text-center"
                  >
                    Please fill all required fields and provide a rating
                  </motion.p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            backdropFilter: "blur(10px)",
          },
        }}
      />
    </div>
  )
}

export default Page
