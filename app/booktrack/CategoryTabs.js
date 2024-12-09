import React from "react";

const categories = ["All", "Read", "Want to Read", "Currently Reading"];

const CategoryTabs = ({ currentCategory, onCategoryChange }) => {
  return (
    <div className="flex space-x-4 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full ${
            currentCategory === category
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-500 hover:text-white transition`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
