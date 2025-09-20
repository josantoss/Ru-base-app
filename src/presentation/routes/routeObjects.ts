import React from "react";
import { redirect } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import RoleGuard from "../components/RoleGuard";
import Layout from "../components/Layout";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import LinkedInCallback from "../pages/LinkedInCallback";
import GoogleCallback from "../pages/GoogleCallback";
import SocialAuthStart from "../pages/SocialAuthStart";
import Categories from "../pages/Categories";
import Users from "../pages/Users";
import Roles from "../pages/Roles";
import { getApiUrl } from "../../utils/apiConfig";
import type { UserRole } from "../../types";

// Helper function to create role-protected components
const withRoleGuard = (Component: React.ComponentType, requiredRole: UserRole) => {
  return () => React.createElement(
    RoleGuard,
    { requiredRole, children: React.createElement(Component) }
  );
};

// Role-protected components
const ProtectedCategories = withRoleGuard(Categories, "user");
const ProtectedUsers = withRoleGuard(Users, "moderator");
const ProtectedRoles = withRoleGuard(Roles, "admin");

// Loaders for protected routes
const categoriesLoader = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  return ["Category 1", "Category 2", "Category 3"];
};

const usersLoader = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  return [
    { id: "1", username: "john_doe", email: "john@example.com", role: "admin" },
    { id: "2", username: "jane_smith", email: "jane@example.com", role: "user" },
    { id: "3", username: "bob_wilson", email: "bob@example.com", role: "user" }
  ];
};

const rolesLoader = async () => {
  try {
    // Use real API to fetch roles
    const response = await fetch(getApiUrl('roles'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch roles: ${response.status}`);
    }

    const roles = await response.json();
    // Transform API response to match expected format
    return roles.map((role: any, index: number) => ({
      id: role.id || (index + 1).toString(),
      name: role.name || role.normalizedName || 'Unknown',
      description: role.description || `Role: ${role.name || role.normalizedName || 'Unknown'}`
    }));
  } catch (error) {
    console.error('Error fetching roles:', error);
    // Fallback to mock data if API fails
    return [
      { id: "1", name: "admin", description: "Full system access" },
      { id: "2", name: "user", description: "Basic user access" },
      { id: "3", name: "moderator", description: "Moderate content access" }
    ];
  }
};

// Helper: check token validity (matches AuthContext logic)
const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// Wrap a loader to ensure authentication before running it
const requireAuthLoader = <T,>(loader?: () => Promise<T>) => {
  return async () => {
    const token = localStorage.getItem('authToken');
    if (!token || !isTokenValid(token)) {
      return redirect('/login');
    }
    return loader ? loader() : (null as unknown as T);
  };
};

// Public routes with Navbar
export const publicRoutes = [
  {
    path: "/",
    element: React.createElement(Landing)
  },
  {
    path: "/home",
    element: React.createElement(Home)
  },
  {
    path: "/about",
    element: React.createElement(About)
  },
  {
    path: "/login",
    element: React.createElement(Login)
  },
  {
    path: "/signup",
    element: React.createElement(Signup)
  },
  {
    path: "/linkedin-callback",
    element: React.createElement(LinkedInCallback)
  },
  {
    path: "/google-callback",
    element: React.createElement(GoogleCallback)
  },
  {
    path: "/auth/:provider/start",
    element: React.createElement(SocialAuthStart)
  },
  {
    path: "*",
    loader: () => redirect("/home")
  }
];

// Protected routes with role-based access
export const protectedRoutes = [
  {
    path: "/categories",
    element: React.createElement(ProtectedCategories),
    loader: requireAuthLoader(categoriesLoader)
  },
  {
    path: "/users",
    element: React.createElement(ProtectedUsers),
    loader: requireAuthLoader(usersLoader)
  },
  {
    path: "/roles",
    element: React.createElement(ProtectedRoles),
    loader: requireAuthLoader(rolesLoader)
  }
];

// Error boundary component for 404 pages
const ErrorBoundary = () => React.createElement(
  'div',
  { className: 'p-6' },
  React.createElement('h1', { className: 'text-xl font-bold mb-2' }, 'Page not found'),
  React.createElement('a', { href: '/home', className: 'text-blue-600 underline' }, 'Go to Home')
);

// Main route configuration
export const routeConfig = {
  element: React.createElement(Layout),
  errorElement: React.createElement(ErrorBoundary),
  children: [
    ...publicRoutes,
    {
      element: React.createElement(ProtectedRoute),
      children: protectedRoutes
    }
  ]
};
