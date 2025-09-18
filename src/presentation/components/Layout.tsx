import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAuthorization } from "../../hooks/useAuthorization";
import { Link, useNavigate } from "react-router-dom";

const Layout: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { hasRole } = useAuthorization();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <span className="text-xl font-bold">Management System</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/home"
                  className="border-b-2 border-transparent hover:border-white px-3 py-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="border-b-2 border-transparent hover:border-white px-3 py-2 text-sm font-medium"
                >
                  About
                </Link>
                {isAuthenticated ? (
                  <>
                    {hasRole('user') && (
                      <Link
                        to="/categories"
                        className="border-b-2 border-transparent hover:border-white px-3 py-2 text-sm font-medium"
                      >
                        Categories
                      </Link>
                    )}
                    {hasRole('moderator') && (
                      <Link
                        to="/users"
                        className="border-b-2 border-transparent hover:border-white px-3 py-2 text-sm font-medium"
                      >
                        Users
                      </Link>
                    )}
                    {hasRole('admin') && (
                      <Link
                        to="/roles"
                        className="border-b-2 border-transparent hover:border-white px-3 py-2 text-sm font-medium"
                      >
                        Roles
                      </Link>
                    )}
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="border-b-2 border-transparent hover:border-white px-3 py-2 text-sm font-medium"
                  >
                    Login
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
