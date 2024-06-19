"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

function Page() {
  const router = useRouter();
  return (
    <>
    <h1 className="text-3xl text-white">Collect Your Testimonials</h1>
    <button
          type="button"
          onClick={() => router.push('/getTestimonials')}
          className="bg-blue-500 mt-5 cursor-pointer ml-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Your Testimonials
        </button>
    </>
  )
}

export default Page