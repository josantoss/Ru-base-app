import React from "react";
import { useLoaderData } from "react-router-dom";

interface RoleData {
  id: string;
  name: string;
  description: string;
}

const Roles: React.FC = () => {
  const roles = useLoaderData() as RoleData[];
  
  return (
    <div className="p-4 text-ambient">
      <h1 className="text-2xl font-bold mb-6 header-ambient">Roles Management</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <div key={role.id} className="card-ambient p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {role.name}
              </h3>
              <span className={`badge-ambient ${
                role.name === 'admin' 
                  ? 'badge-admin' 
                  : role.name === 'moderator'
                  ? 'badge-moderator'
                  : 'badge-user'
              }`}>
                {role.name}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {role.description}
            </p>
            <div className="flex space-x-2">
              <button className="flex-1 btn-ambient text-sm py-2 px-3">
                Edit
              </button>
              <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-sm py-2 px-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Permissions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roles;
