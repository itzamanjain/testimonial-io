'use client';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UserCard = ({ user }) => (
  <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2c2c2c] text-white shadow-xl rounded-2xl p-5 m-4 max-w-md flex items-center gap-5 border border-gray-700 hover:border-gray-500 transition-all duration-300">
    <Image
      src={user.avatarUrl || "/placeholder.png"}
      alt={user.fullname ? `${user.fullname}'s profile picture` : "User profile picture"}
      width={80}
      height={80}
      className="w-20 h-20 rounded-full object-cover border-2 border-[#313131] shadow-md"
      priority
    />

    <div className="flex-1">
      <Link href={`/profile/${user.username}`} className="hover:underline">
        <h2 className="text-xl font-semibold text-white mb-1">{user.fullname}</h2>
      </Link>
      <p className="text-sm text-gray-400 mb-1">@{user.username}</p>
      <p className="text-sm text-gray-300 mb-2">{user.email}</p>
      
    </div>
  </div>
);

const Page = () => {
  const [customers, setCustomers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      console.log('Sending request');
      
      const res = await axios.get('/api/user/allusers');
      console.log(res.data.users);
      
      setCustomers(res.data.users);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) 
    return (
      <div className="flex justify-center items-center min-h-screen">
       <Loader2 className='animate-spin w-4 h-4 text-white' />
      </div>
    )
  ;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Our Users</h1>
      <div className="flex flex-wrap justify-center">
        {customers.map(user => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Page;
