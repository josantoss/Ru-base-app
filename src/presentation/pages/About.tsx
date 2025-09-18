import React from "react";

const About: React.FC = () => {
  return (
    <div className="p-4 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">About Our Management System</h1>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Application Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This is a professional management system built with modern technologies including 
            React, TypeScript, and Tailwind CSS. It follows clean architecture principles 
            and implements enterprise-grade JWT-based authentication and role-based authorization.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The system provides secure access control, efficient data management, and 
            intuitive user interfaces designed for professional business environments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Features</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                JWT Authentication & Authorization
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Protected Routes with Guards
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Route Loaders for Data Fetching
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Clean Architecture Pattern
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Repository Pattern Implementation
              </li>
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-green-600">Technology Stack</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                React 19 with TypeScript
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                React Router v6
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Tailwind CSS
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Vite Build Tool
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                ESLint & TypeScript
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
