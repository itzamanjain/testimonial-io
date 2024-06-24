import React from 'react';
import Image from 'next/image';

const Test = () => {
    const testimonial = {
        photo: 'https://randomuser.me/api/portraits/women/32.jpg',
        name: 'Emily Johnson',
        position: 'Marketing Director',
        company: 'XYZ Company',
        social: '@emilyjohnson',
        review: 'It was great working with the team. They are very professional and delivered the project on time. I would highly recommend them.'
    };

    return (
        <div className="max-w-sm mt-5  w-full bg-white shadow-lg rounded-lg overflow-hidden mx-auto">
            <div className="px-6 py-4">
                <div className="flex flex-row gap-5 justify-center">
                    <Image className="object-cover rounded-full " src={testimonial.photo} alt={testimonial.name}
                        width={80}
                        height={80}
                    />
                    <div className='flex flex-col'>
                        <p className="text-lg text-gray-800 font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.position} at {testimonial.company}</p>
                        <p className="text-xs text-gray-600">{testimonial.social}</p>
                    </div>
                </div>
                <div className="text-center mt-4">

                    <p className="mt-4 text-gray-800">{testimonial.review}</p>
                </div>
            </div>
        </div>
    );
};

export default Test;
