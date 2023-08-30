import React, { useState } from "react";

function StringsSection({
  families,
  stringData,
}: {
  families: string[];
  stringData: string[];
}) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  /*const families = [
    "Malware",
    "Phishing",
    "Social Engineering",
    "Spam",
    "Suspicious",
    "Unknown",
    "Other",
  ];*/
  const stringsData = [
    {
      string:
        ".?AU?$_PPLTaskHandle@EU?$_InitialTaskHandle@XV<lambda_7a66c1da0ea0e694bfc05d79bffbd28e>@@U_TypeSelectorNoAsync@details@Concurrency@@@?$task@E@Concurrency@@U_TaskProcHandle@details@3@@details@Concurrency@@",
      family: families,
      tags: ["path"],
    },
    // Add more data as needed...
  ];

  const handleFilterChange = (family: string) => {
    if (selectedFilters.includes(family)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== family));
    } else {
      setSelectedFilters([...selectedFilters, family]);
    }
  };

  const filteredStrings = stringsData.filter((string) => {
    if (selectedFilters.length === 0) {
      return true;
    }
    return selectedFilters.some((filter) => string.family === filter);
  });

  return (
    <div className="mt-8">
      <div className="flex">
        {/* Sidebar for Filters */}
        <div className="w-1/4 px-4">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Filter By:</h2>
          <ul>
            {families.map((family) => (
              <li key={family} className="mb-2">
                <label className="flex items-center space-x-2 dark:text-white">
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(family)}
                    onChange={() => handleFilterChange(family)}
                    className="rounded-sm text-blue-500 dark:bg-gray-800 focus:outline-none focus-visible:outline-none focus:ring-transparent"
                  />
                  <span>{family}</span>
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
                    Family: {string.family}
                  </span>
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
