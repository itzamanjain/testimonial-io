import React from 'react';
import Link from 'next/link';

function ContactPage() {
  return (
    <>
      <h1 className='text-2xl mt-10 text-center text-white'>Contact Us</h1>
      <div className='text-center text-xl mt-4'>
        <Link href='mailto:jainaman0744@gmail.com'>
         Email us <span className='text-yellow-500'>@Click Here</span>
        </Link>
      </div>
    </>
  );
}

export default ContactPage;
