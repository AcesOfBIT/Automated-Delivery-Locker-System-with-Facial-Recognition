import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Home = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const roleLinks = {
    user: [
      { to: '/user/dashboard', label: 'Dashboard' },
      { to: '/user/packages', label: 'My Packages' }
    ],
    courier: [
      { to: '/courier/dashboard', label: 'Deliveries' }
    ],
    admin: [
      { to: '/admin/dashboard', label: 'Admin Dashboard' },
      { to: '/admin/users', label: 'User Management' },
      { to: '/admin/sessions', label: 'Sessions' },
      { to: '/admin/packages', label: 'Packages' },
      { to: '/admin/lockers', label: 'Lockers' },
      { to: '/admin/logs', label: 'Logs' }
    ]
  };

  const links = roleLinks[user?.role] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay when sidebar is open on small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar (mobile + desktop) */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:shadow-none`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setSidebarOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={logout}
            className="mt-4 text-red-500 hover:underline"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="md:ml-64">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow md:px-8">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold">Welcome, {user?.name || 'User'}</h1>
          </div>
          <div className="hidden md:block">
            <button
              onClick={logout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Home Page</h2>
          <p className="text-gray-600">
            This is the landing page after login. Use the sidebar to navigate.
          </p>
        </main>
      </div>
    </div>
  );
};

export default Home;
