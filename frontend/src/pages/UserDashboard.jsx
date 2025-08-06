import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <p className="text-lg">Welcome, {user?.name || 'User'}!</p>
    </div>
  );
};

export default UserDashboard;
