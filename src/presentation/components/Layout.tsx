import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  useAuth();
  // Ensure auth context is initialized (no direct use here)

  // kept for potential future use in layout-level logout controls

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
