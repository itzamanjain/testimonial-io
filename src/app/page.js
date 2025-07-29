"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  Star,
  Users,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Quote,
  TrendingUp,
  Globe,
  Award,
  MessageSquare,
  Share2,
  Menu,
  X,
  Play,
  ChevronDown,
  Linkedin,
  Twitter,
  Github,
  User,
} from "lucide-react"

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      // className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      //   scrolled ? "bg-gray-900/95 backdrop-blur-lg border-b border-gray-800" : "bg-transparent"
      // }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <User className="text-white" size={24} />
            </div> */}
            <span className="text-2xl font-bold text-white bg-clip-text text-transparent">
              Endorse Collect
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </a>
            <Link href="/signin" className="text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-800/95 backdrop-blur-lg rounded-lg mt-2 p-4"
          >
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                How it Works
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
              <Link href="/signin" className="text-gray-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/signup">
                <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold">
                  Get Started
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

// Hero Section
const HeroSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-black"></div>
      <motion.div style={{ y }} className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Collect Powerful
            <span className="block text-white bg-clip-text text-transparent">
              Testimonials
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Build trust, showcase your work, and grow your business with authentic customer testimonials. Create your
            profile and start collecting social proof today.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Start Collecting Free
                <ArrowRight className="inline ml-2" size={20} />
              </motion.button>
            </Link>
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
            >
              <Play className="inline mr-2" size={20} />
              Watch Demo
            </motion.button> */}
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-400" size={20} />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-400" size={20} />
              <span>Free Forever Plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-400" size={20} />
              <span>Setup in 2 Minutes</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
      >
        <ChevronDown className="text-gray-400" size={32} />
      </motion.div>
    </section>
  )
}

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "Easy Collection",
      description: "Send personalized requests and collect testimonials effortlessly with our simple forms.",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security and privacy controls.",
      color: "green",
    },
    {
      icon: Globe,
      title: "Embed Anywhere",
      description: "Display testimonials on your website, social media, or marketing materials instantly.",
      color: "purple",
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Track performance and get insights on your testimonial collection campaigns.",
      color: "orange",
    },
    {
      icon: Share2,
      title: "Social Sharing",
      description: "Share testimonials across all your social platforms with one click.",
      color: "pink",
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description: "Get notified immediately when new testimonials are submitted.",
      color: "yellow",
    },
  ]

  return (
    <section id="features" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white bg-clip-text text-transparent">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powerful features designed to help you collect, manage, and showcase testimonials that drive results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all"
            >
              <div className={`w-16 h-16 bg-${feature.color}-500/20 rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className={`text-${feature.color}-400`} size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// How It Works Section
const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Set up your professional profile in minutes with your branding and information.",
      icon: Users,
    },
    {
      number: "02",
      title: "Send Requests",
      description: "Share your custom testimonial link with clients or send personalized requests.",
      icon: MessageSquare,
    },
    {
      number: "03",
      title: "Collect & Showcase",
      description: "Receive testimonials and display them on your website or marketing materials.",
      icon: Award,
    },
  ]

  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get started in three simple steps and begin collecting powerful testimonials today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              {/* Connection Line */}
              {/* {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-yellow-400 to-purple-500 transform translate-x-4"></div>
              )} */}

              <div className="relative">
                <div className="w-32 h-32 bg-blue-600  rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <step.icon className="text-white" size={48} />
                </div>
                {/* <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
                  {step.number}
                </div> */}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed max-w-sm mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Social Proof Section
const SocialProofSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content:
        "Endorse Collect transformed how we gather customer feedback. The process is seamless and the results speak for themselves.",
      rating: 5,
      avatar: "/placeholder.png?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Freelance Designer",
      company: "Design Studio",
      content:
        "As a freelancer, testimonials are crucial for my business. This platform made it incredibly easy to collect and showcase them.",
      rating: 5,
      avatar: "/placeholder.png?height=60&width=60",
    },
    {
      name: "Emily Rodriguez",
      role: "Agency Owner",
      company: "Creative Agency",
      content:
        "The analytics and insights helped us understand our client satisfaction better. Highly recommend for any service business.",
      rating: 5,
      avatar: "/placeholder.png?height=60&width=60",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Trusted by Professionals</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of professionals who are already using Endorse Collect to grow their business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:border-white/30 transition-all"
            >
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <Quote className="text-blue-400 mb-4" size={32} />
              <p className="text-gray-300 mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar || "/placeholder.png"}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { number: "10K+", label: "Happy Users" },
            { number: "50K+", label: "Testimonials Collected" },
            { number: "99.9%", label: "Uptime" },
            { number: "24/7", label: "Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Pricing Section
const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: ["Up to 10 testimonials", "Basic customization", "Email support", "Standard templates"],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For growing businesses",
      features: [
        "Unlimited testimonials",
        "Advanced customization",
        "Priority support",
        "Analytics dashboard",
        "Custom branding",
        "API access",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "White-label solution",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee",
        "Training & onboarding",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the plan that fits your needs. Start free and upgrade as you grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className={`relative p-8 rounded-2xl border transition-all ${
                plan.popular
                  ? "bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/50 shadow-2xl"
                  : "bg-gray-800/50 border-gray-700/50 hover:border-gray-600/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="text-green-400 mr-3 flex-shrink-0" size={20} />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-lg hover:shadow-xl"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to collect testimonials?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We are loved by startups, marketing agencies, real estate agencies, freelancers, Fortune 500 companies and many more. Your customers testimonials are the best social proof we can get! Get started now ✨
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Start Free Today
                <ArrowRight className="inline ml-2" size={20} />
              </motion.button>
            </Link>
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/30 transition-all"
            >
              Schedule Demo
            </motion.button> */}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Award className="text-white" size={24} />
              </div> */}
              <span className="text-2xl font-bold text-white bg-clip-text text-transparent">
                Endorse Collect
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The easiest way to collect, manage, and showcase testimonials that drive business growth.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <motion.a
                href="https://linkedin.com/in/itzamanjain"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://github.com/itzamanjain"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all"
              >
                <Github size={20} />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">© 2024 Endorse Collect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main Home Page Component
function HomePage() {
  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SocialProofSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default HomePage
