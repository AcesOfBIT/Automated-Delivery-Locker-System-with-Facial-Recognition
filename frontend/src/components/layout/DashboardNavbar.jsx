import { useContext } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";

const DashboardNavbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      {/* Hamburger (visible only on small screens) */}
      <button
        className="lg:hidden text-2xl text-gray-800"
        onClick={onMenuClick}
      >
        &#9776;
      </button>

      <h1 className="text-lg font-bold text-blue-600">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700 hidden sm:inline">{user?.name}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;
