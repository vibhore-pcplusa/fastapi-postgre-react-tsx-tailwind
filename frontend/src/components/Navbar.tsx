import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="p-4 bg-gray-100 text-center font-bold text-lg text-gray-800 border-b-2 border-gray-300 mb-4 rounded-t-lg">
      <div className="block px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 w-[30%] mx-auto mb-4">
        Menu
      </div>
      <ul className="flex justify-center space-x-4">
        <li>
          <Link
            to="/dashboard"
            className={`block px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors ${
              isActive("/dashboard") || isActive("/")
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white hover:bg-blue-700 focus:ring-blue-400"
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/playground"
            className={`block px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors ${
              isActive("/playground") || isActive("/")
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white hover:bg-blue-700 focus:ring-blue-400"
            }`}
          >
            Playground
          </Link>
        </li>
        <li>
          <Link
            to="/employees"
            className={`block px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors ${
              isActive("/employees")
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white hover:bg-blue-700 focus:ring-blue-400"
            }`}
          >
            Manage Employees
          </Link>
        </li>
        <li>
          <Link
            to="/departments"
            className={`block px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors ${
              isActive("/departments")
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white hover:bg-blue-700 focus:ring-blue-400"
            }`}
          >
            Manage Department
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;