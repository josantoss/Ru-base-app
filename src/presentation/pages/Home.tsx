import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAuthorization } from "../../hooks/useAuthorization";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { hasRole } = useAuthorization();

  return (
    <div className="p-4 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Management System
          </h1>
          {isAuthenticated && user ? (
            <p className="text-xl text-gray-600">
              Hello, <span className="font-semibold text-blue-600">{user.username}</span>! 
              You're successfully logged in.
            </p>
          ) : (
            <p className="text-xl text-gray-600">
              Please log in to access all features
            </p>
          )}
        </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Categories</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Manage and organize your content categories
                  </p>
                  {isAuthenticated && hasRole('user') ? (
                    <Link
                      to="/categories"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                    >
                      View Categories
                    </Link>
                  ) : isAuthenticated ? (
                    <span className="inline-block bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed shadow-sm">
                      Insufficient Role
                    </span>
                  ) : (
                    <Link
                      to="/login"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                    >
                      Login Required
                    </Link>
                  )}
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Users</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Manage user accounts and permissions
                  </p>
                  {isAuthenticated && hasRole('moderator') ? (
                    <Link
                      to="/users"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                    >
                      View Users
                    </Link>
                  ) : isAuthenticated ? (
                    <span className="inline-block bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed shadow-sm">
                      Insufficient Role
                    </span>
                  ) : (
                    <Link
                      to="/login"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                    >
                      Login Required
                    </Link>
                  )}
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Roles</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Configure user roles and access levels
                  </p>
                  {isAuthenticated && hasRole('admin') ? (
                    <Link
                      to="/roles"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                    >
                      View Roles
                    </Link>
                  ) : isAuthenticated ? (
                    <span className="inline-block bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed shadow-sm">
                      Insufficient Role
                    </span>
                  ) : (
                    <Link
                      to="/login"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                    >
                      Login Required
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/about"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
              >
                Learn More About Our Application
              </Link>
            </div>
      </div>
    </div>
  );
};

export default Home;
