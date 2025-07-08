import React from "react";
import { PackageCheck, LogOut, PackageOpen } from "lucide-react";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-semibold flex items-center gap-2 text-blue-700 mb-6">
          <PackageCheck className="text-blue-500" size={28} />
          Welcome, Customer!
        </h1>

        <div className="bg-blue-100 p-4 rounded-md mb-4 flex items-center gap-3">
          <PackageOpen className="text-blue-600" />
          <span className="text-blue-800 font-medium">You have 3 packages assigned.</span>
        </div>

        <div className="bg-white border border-blue-200 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2 text-blue-600">Package Details</h2>
          <ul className="space-y-2 text-gray-700">
            <li>📦 Package 1 – Locker 3</li>
            <li>📦 Package 2 – Locker 7</li>
            <li>📦 Package 3 – Locker 9</li>
          </ul>
        </div>

        <button className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded flex items-center justify-center gap-2">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
