import { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "../Sidebar"; // create this next
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) return <Navigate to="/login" />;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex flex-col flex-1 w-full">
        <DashboardNavbar onMenuClick={toggleSidebar} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
