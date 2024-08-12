'use client';
import axios from 'axios';
import React from 'react';

const UserCard = ({ user }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 m-4 max-w-sm hover:shadow-xl transition-shadow duration-300">
    <h2 className="text-2xl font-bold mb-2 text-indigo-600">{user.fullname}</h2>
    <p className="text-gray-600 mb-2">@{user.username}</p>
    <p className="text-gray-800 mb-4">{user.email}</p>
    <div className="text-sm text-gray-500">
      
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

  if (loading) return <p className="text-center mt-8">Loading...</p>;
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
