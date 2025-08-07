import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="bg-white shadow-md px-4 py-3 flex justify-between items-center md:hidden">
        <button onClick={toggleSidebar} className="text-2xl text-gray-800">
          &#9776;
        </button>
        <h1 className="text-xl font-bold text-blue-600">Smart Locker System</h1>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <nav className="flex flex-col gap-4">
            <Link to="/" onClick={toggleSidebar}>Home</Link>
            {!user && <Link to="/login" onClick={toggleSidebar}>Login</Link>}
            {!user && <Link to="/register" onClick={toggleSidebar}>Register</Link>}
            {user && <button onClick={logout}>Logout</button>}
          </nav>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      <nav className="hidden md:flex justify-between items-center bg-white px-8 py-4 shadow">
        <h1 className="text-xl font-bold text-blue-600">Smart Locker System</h1>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          {!user && <Link to="/login" className="hover:text-blue-500">Login</Link>}
          {!user && <Link to="/register" className="hover:text-blue-500">Register</Link>}
          {user && <button onClick={logout} className="text-red-500 hover:text-red-600">Logout</button>}
        </div>
      </nav>
    </>
  );
};

export default Navbar;