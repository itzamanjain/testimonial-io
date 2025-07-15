"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import TestimonialCard from "@/components/TestimonialCard"
import toast, { Toaster } from "react-hot-toast"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  LogOut,
  ExternalLink,
  Search,
  Share2,
  Download,
  Copy,
  Star,
  TrendingUp,
  Users,
  Award,
  Settings,
  Plus,
  Grid,
  List,
  RefreshCw,
} from "lucide-react"

// Loading Skeleton Component
const ProfileSkeleton = () => (
  <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 p-8 rounded-xl shadow-2xl mb-12 animate-pulse">
    <div className="flex items-center space-x-8 mb-8">
      <div className="w-32 h-32 bg-gray-700 rounded-full"></div>
      <div className="flex-grow space-y-4">
        <div className="h-8 bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  </div>
)

const TestimonialSkeleton = () => (
  <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-xl p-6 animate-pulse">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    </div>
  </div>
)

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, color = "blue" }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-gradient-to-br from-${color}-500/20 to-${color}-600/20 p-6 rounded-xl border border-${color}-500/30`}
  >
    <div className="flex items-center space-x-4">
      <div className={`p-3 bg-${color}-500/20 rounded-lg`}>
        <Icon className={`text-${color}-400`} size={24} />
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className={`text-${color}-300 text-sm`}>{label}</p>
      </div>
    </div>
  </motion.div>
)

// Filter Component
const FilterBar = ({ searchTerm, setSearchTerm, sortBy, setSortBy, viewMode, setViewMode }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl mb-8 border border-gray-700/50"
  >
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search testimonials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      <div className="flex items-center space-x-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="rating">Highest Rating</option>
        </select>

        <div className="flex bg-gray-700/50 rounded-lg p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"}`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${viewMode === "list" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
)

// Empty State Component
const EmptyState = () => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
    <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
      <Star className="text-gray-400" size={32} />
    </div>
    <h3 className="text-2xl font-semibold text-gray-300 mb-4">No testimonials yet</h3>
    <p className="text-gray-500 mb-8 max-w-md mx-auto">
      Start collecting testimonials to showcase your work and build trust with potential clients.
    </p>
    {/* <Link href="/getTestimonials">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
      >
        <Plus className="inline mr-2" size={20} />
        Get Your First Testimonial
      </motion.button>
    </Link> */}
  </motion.div>
)

function ProfilePage() {
  const router = useRouter()
  const params = useParams()
  const username = Array.isArray(params.username) ? params.username[0] : params.username

  const [user, setUser] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [filteredTestimonials, setFilteredTestimonials] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState("grid")
  const [retrying, setRetrying] = useState(false)

//   const handleLogout = async () => {
//     try {
//       await axios.get("/api/user/logout")
//       toast.success("User logged out successfully!")
//       router.push("/signin")
//     } catch (error) {
//       toast.error("Failed to logout user!")
//       console.log("Error:", error.message)
//     } finally {
//       router.push("/signin")
//     }
//   }

    // get username from url 
    // make a api call to this http://localhost:3000/api/user/getuser/?username=itsamanjain
    // will return user with testimonials

  const fetchUserProfile = async () => {
  setLoading(true)
  setError(null)
  try {
    const response = await axios.get(`/api/user/getuser/?username=${username}`)
    // fetchedUser is an array, take the first element
    setUser(response.data.fetchedUser[0])
    setTestimonials(response.data.testimonials)
    setFilteredTestimonials(response.data.testimonials)
  } catch (error) {
    setError(error)
  } finally {
    setLoading(false)
  }
}

  const handleRetry = async () => {
    setRetrying(true)
    await fetchUserProfile()
    setRetrying(false)
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  // Filter and sort testimonials
  useEffect(() => {
    const filtered = testimonials.filter(
      (testimonial) =>
        testimonial.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.customerReview?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.customerCompany?.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Sort testimonials
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt)
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt)
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })

    setFilteredTestimonials(filtered)
  }, [testimonials, searchTerm, sortBy])


  const shareProfile = async () => {
    const profileUrl = `${window.location.origin}/profile/${user?.username || user?._id}`
    try {
      await navigator.clipboard.writeText(profileUrl)
      toast.success("Profile link copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy profile link")
    }
  }

  const exportTestimonials = () => {
    const dataStr = JSON.stringify(testimonials, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "testimonials.json"
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
    toast.success("Testimonials exported successfully!")
  }

  const averageRating =
    testimonials.length > 0
      ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1)
      : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-700 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <ProfileSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/10 border border-red-500/30 text-white p-8 rounded-xl shadow-lg text-center max-w-md"
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="text-red-400" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
          <p className="text-gray-300 mb-6">{error.message}</p>
          <motion.button
            onClick={handleRetry}
            disabled={retrying}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {retrying ? (
              <>
                <RefreshCw className="inline mr-2 animate-spin" size={16} />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="inline mr-2" size={16} />
                Try Again
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-12"
        >
          <h1 className="text-4xl font-semibold  bg-clip-text text-gray-300">
            {username}'s Profile
          </h1>
          <div className="flex space-x-4">
            <motion.button
              onClick={shareProfile}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-all"
            >
              <Share2 className="inline mr-2" size={16} />
              Share
            </motion.button>
            <motion.button
              onClick={exportTestimonials}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-green-600/20 border border-green-500/30 text-green-300 rounded-lg hover:bg-green-600/30 transition-all"
            >
              <Download className="inline mr-2" size={16} />
              Export
            </motion.button>
            {/* <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-600/30 transition-all"
            >
              <LogOut className="inline mr-2" size={16} />
              Logout
            </motion.button> */}
          </div>
        </motion.div>

        {user && (
          <>
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl mb-12 border border-gray-700/50"
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="relative group">
                  <Image
                    src={user?.avatarUrl || "/placeholder.svg?height=150&width=150"}
                    alt="User Photo"
                    width={150}
                    height={150}
                    className="rounded-full border-4 border-blue-500/30 shadow-lg group-hover:border-blue-500/50 transition-all"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
                </div>

                <div className="flex-grow text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      
                      <p className="text-2xl text-gray-300 mb-2">{user.fullname}</p>
                      <p className="text-blue-300 flex items-center justify-center lg:justify-start">
                        <Mail className="mr-2" size={16} />
                        {user.email}
                      </p>
                    </div>
                    
                  </div>

                  <p className="text-gray-300 mb-6 max-w-2xl">
                    Professional testimonial collector and reviewer. Building trust through authentic customer feedback.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              <StatsCard icon={Award} label="Total Reviews" value={testimonials.length} color="blue" />
              <StatsCard icon={Star} label="Average Rating" value={averageRating} color="blue" />
              <StatsCard
                icon={TrendingUp}
                label="This Month"
                value={
                  testimonials.filter((t) => new Date(t.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
                    .length
                }
                color="green"
              />
              <StatsCard
                icon={Users}
                label="Happy Clients"
                value={new Set(testimonials.map((t) => t.customerEmail)).size}
                color="green"
              />
            </motion.div>

            {/* Get Testimonials CTA */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center mb-12"
            >
              <Link href="/getTestimonials">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-gray-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  <Plus className="inline mr-2" size={20} />
                  Get Testimonials
                </motion.button>
              </Link>
            </motion.div> */}
          </>
        )}

        {/* Reviews Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold bg-clip-text text-gray-300">
              Reviews ({filteredTestimonials.length})
            </h2>
          </div>

          {testimonials.length > 0 && (
            <FilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          )}

          <AnimatePresence mode="wait">
            {filteredTestimonials.length === 0 ? (
              testimonials.length === 0 ? (
                <EmptyState />
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <Search className="mx-auto mb-4 text-gray-400" size={48} />
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No testimonials found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or filters</p>
                </motion.div>
              )
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`grid gap-8 ${
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700/50 hover:border-gray-600/50 transition-all"
                  >
                    <TestimonialCard {...testimonial} />
                  
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      />
    </div>
  )
}

export default ProfilePage
