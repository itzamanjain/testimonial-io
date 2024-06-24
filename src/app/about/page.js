import React from 'react';

function Page() {
  return (
    <>
      <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mt-5 mb-4">About Us</h1>
        <div className="max-w-2xl text-center mb-4">
          Endorse Collect is a platform that allows you to collect testimonials from your customers and display them on your website. It is a simple and easy-to-use tool that helps you build trust with your customers and increase your sales. With Endorse Collect, you can create beautiful testimonial pages, collect testimonials from your customers, and display them on your website in minutes. Sign up today and start collecting testimonials from your customers!
        </div>
        <hr className="w-full max-w-2xl mb-4" />
        <div className="max-w-2xl text-xl text-center">
          &quot;Currently we are in a very early stage of development. We are working hard to bring you the best experience. Please bear with us.&quot;
        </div>
      </div>
    </>
  );
}

export default Page;
