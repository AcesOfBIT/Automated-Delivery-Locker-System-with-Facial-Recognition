import React from "react";
import { ServerCog, Users, LogOut } from "lucide-react";

const SuperAdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <ServerCog className="text-purple-600" /> SuperAdmin Dashboard
      </h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <button className="bg-indigo-500 text-white px-4 py-2 rounded flex items-center gap-2">
          <Users /> Manage Users and Admins
        </button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded flex items-center gap-2">
          <ServerCog /> System Settings
        </button>
      </div>
      <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2">
        <LogOut /> Logout
      </button>
    </div>
  );
};

export default SuperAdminDashboard;
