"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

function Page() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center px-4">
        <h1 className="text-3xl md:text-6xl font-bold text-white text-center">
          Collect Your
        </h1>
        <span className="text-3xl md:text-6xl font-bold bg-clip-text ml-0 md:ml-4 text-transparent bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end text-center">
          Testimonials
        </span>
      </div>
      <div className="flex justify-center mt-5">
        <button
          type="button"
          onClick={() => router.push('/getTestimonials')}
          className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Your Testimonials
        </button>
      </div>
      
      
    </>
  )
}

export default Page
