import React from 'react';

const CourierDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Courier Dashboard</h1>
      <p className="text-lg">Manage deliveries and assign lockers.</p>
      {/* Placeholder for delivery list */}
      <div className="mt-6 p-4 bg-white rounded shadow">
        <p className="text-gray-500">No deliveries yet.</p>
      </div>
    </div>
  );
};

export default CourierDashboard;
