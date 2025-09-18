import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAuthorization } from "../../hooks/useAuthorization";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { hasRole } = useAuthorization();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/home" className="flex-shrink-0">
              <span className="text-xl font-bold">Management System</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/home"
                className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/home') 
                    ? 'border-white text-white' 
                    : 'border-transparent hover:border-white text-white hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/about') 
                    ? 'border-white text-white' 
                    : 'border-transparent hover:border-white text-white hover:text-white'
                }`}
              >
                About
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/login') 
                      ? 'border-white text-white' 
                      : 'border-transparent hover:border-white text-white hover:text-white'
                  }`}
                >
                  Login
                </Link>
              )}
              {isAuthenticated && hasRole('admin') && (
                <Link
                  to="/roles"
                  className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/roles') 
                      ? 'border-white text-white' 
                      : 'border-transparent hover:border-white text-white hover:text-white'
                  }`}
                >
                  Roles
                </Link>
              )}
            </div>
          </div>
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-200">
                {user?.username} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
