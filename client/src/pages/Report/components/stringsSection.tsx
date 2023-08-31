import React, { useState } from "react";

function StringsSection({
  strings,
}: {
  strings: { [key: string]: { family: string; tags: string[] } };
}) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Get all the families, but remove empty ones
  const families = Object.keys(strings).filter(
    (family) => strings[family].length > 0
  );

  const handleFilterChange = (family: string) => {
    if (selectedFilters.includes(family)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== family));
    } else {
      setSelectedFilters([...selectedFilters, family]);
    }
  };

  const filteredStrings = families.filter((family) => {
    if (selectedFilters.length === 0) {
      return true;
    }
    return selectedFilters.some((filter) => family === filter);
  });

  return (
    <div className="mt-8">
      <div className="flex">
        {/* Sidebar for Filters */}
        <div className="w-1/4 px-4">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Filter By:</h2>
          <ul>
            <li className="mb-2">
              <label className="flex items-center space-x-2 dark:text-white">
                <input
                  type="checkbox"
                  checked={selectedFilters.length === 0}
                  onChange={() => setSelectedFilters([])}
                  className="rounded-sm text-blue-500 dark:bg-gray-800 focus:outline-none focus-visible:outline-none focus:ring-transparent"
                />
                <span>All</span>
              </label>
            </li>
            {families.map((family) => (
              <li key={family} className="mb-2">
                <label className="flex items-center space-x-2 dark:text-white">
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(family)}
                    onChange={() => handleFilterChange(family)}
                    className="rounded-sm text-blue-500 dark:bg-gray-800 focus:outline-none focus-visible:outline-none focus:ring-transparent"
                  />
                  <span>
                    {family} ({strings[family].length})
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Display Filtered Strings */}
        <div className="w-3/4">
          <ul className="divide-y divide-gray-300 dark:divide-gray-700">
            {filteredStrings.map((family) => (
              <li key={family} className="px-4 py-4 sm:px-6">
                {/* Display strings of this family */}
                <ul className="gap-2">
                  {strings[family].map((string, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex flex-row items-center">
                        <h6>{string}</h6>
                        <div className="flex flex-row items-center ml-2">
                          {strings[family].tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded-full mr-2"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                      <hr className="my-2" />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StringsSection;
