import React from 'react';
import Link from 'next/link';

function ContactPage() {
  return (
    <div className='min-h-screen'>
      <h1 className='text-2xl mt-10 text-center text-white'>Contact Us</h1>
      <div className='text-center text-xl mt-4'>
        <Link href='mailto:jainaman0744@gmail.com'>
         Email us <span className='text-yellow-500'>@Click Here</span>
        </Link>
      </div>
    </div>
  );
}

export default ContactPage;
