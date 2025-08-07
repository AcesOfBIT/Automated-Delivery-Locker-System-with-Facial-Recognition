import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user } = useAuth();

  const links = [
    { to: "/user/dashboard", label: "Dashboard" },
    { to: "/user/packages", label: "My Packages" },
    { to: "/user/pickup", label: "Pickup Locker" },
  ];

  return (
    <aside
      className={`bg-white shadow-md w-64 h-full fixed z-50 top-0 left-0 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static`}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 text-blue-600">User Panel</h2>
        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeSidebar}
              className="text-gray-800 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
