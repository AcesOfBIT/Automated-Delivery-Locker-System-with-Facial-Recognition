import React from "react";
import { ClipboardCheck, Lock, LogOut } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r bg-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-semibold flex items-center gap-2 text-black-700 mb-6">
          <ClipboardCheck className="text-gray-600" size={28} />
          Delivery Dashboard
        </h1>

        <div className="bg-blue-100 p-4 rounded-md mb-4 flex items-center gap-3">
          <Lock className="text-blue-700" />
          <span className="text-blue-800 font-medium">You can assign lockers to packages.</span>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-600 text-white font-semibold py-2 rounded flex items-center justify-center gap-2">
          <Lock /> Assign Locker
        </button>

        <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded flex items-center justify-center gap-2">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
