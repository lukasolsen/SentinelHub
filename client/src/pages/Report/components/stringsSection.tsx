import React, { useState } from "react";

function StringsSection() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const stringsData = [
    {
      string: "String Name",
      tags: ["IPS"],
    },
    // Add more data as needed...
  ];

  const tags = ["IPS", "Websites"]; // Add more categories as needed

  const handleFilterChange = (tag) => {
    if (selectedFilters.includes(tag)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== tag));
    } else {
      setSelectedFilters([...selectedFilters, tag]);
    }
  };

  const filteredStrings = stringsData.filter((string) => {
    if (selectedFilters.length === 0) {
      return true;
    }
    return selectedFilters.some((filter) => string.tags.includes(filter));
  });

  return (
    <div className="mt-8">
      <div className="flex">
        {/* Sidebar for Filters */}
        <div className="w-1/4 px-4">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Filter By:</h2>
          <ul>
            {tags.map((tag) => (
              <li key={tag} className="mb-2">
                <label className="flex items-center space-x-2 dark:text-white">
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(tag)}
                    onChange={() => handleFilterChange(tag)}
                    className="rounded-sm text-blue-500 dark:bg-gray-800 focus:outline-none focus-visible:outline-none focus:ring-transparent"
                  />
                  <span>{tag}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Display Filtered Strings */}
        <div className="w-3/4">
          <ul className="divide-y divide-gray-300 dark:divide-gray-700">
            {filteredStrings.map((string, index) => (
              <li
                key={index}
                className="px-4 py-4 sm:px-6 bg-white dark:bg-gray-800"
              >
                {/* Display string details */}
                <div className="flex flex-row items-center space-x-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {string.string}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Tags: {string.tags.join(", ")}
                  </span>
                  {/* Display other details of the string */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StringsSection;
