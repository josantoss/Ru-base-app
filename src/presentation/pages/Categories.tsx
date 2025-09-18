import React from "react";
import { useLoaderData } from "react-router-dom";

const Categories: React.FC = () => {
  const categories = (useLoaderData() as string[]) || [];
  
  return (
    <div className="p-4 text-ambient">
      <h1 className="text-2xl font-bold mb-6 header-ambient">Categories Management</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.length === 0 && (
          <div className="col-span-full text-gray-600">No categories available. Here are some examples you can manage:</div>
        )}
        {(categories.length ? categories : [
          "Projects",
          "Tasks",
          "Teams",
          "Finance",
          "Inventory",
          "Reports",
        ]).map((category, index) => (
          <div key={index} className="card-ambient p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {category}
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Active
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Category description and details would go here. Use this section to create, edit and view items.
            </p>
            <div className="flex space-x-2">
              <button className="flex-1 btn-ambient text-sm py-2 px-3">
                Edit
              </button>
              <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-sm py-2 px-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                View Items
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
