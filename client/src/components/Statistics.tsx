import React, { useState } from "react";

const countriesData = [
  {
    country: "USA",
    reports: 120,
    percentage: 30,
  },
  {
    country: "Canada",
    reports: 80,
    percentage: 20,
  },
  // ... Add more countries
];

const Statistics = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredCountries =
    selectedFilter === "all"
      ? countriesData
      : countriesData.filter((country) => country.country === selectedFilter);

  return (
    <div className="container mx-auto px-4 py-8 border border-gray-700 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">
        Statistics
      </h2>

      {/* Filters */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`rounded px-4 py-2 ${
            selectedFilter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        {/* Add more filters */}
      </div>

      {/* Countries List */}
      <div className="p-4 rounded-md">
        {filteredCountries.map((country, index) => (
          <div
            key={index}
            className={`flex items-center justify-between py-2 border-b ${
              index !== countriesData.length - 1
                ? "border-gray-300"
                : "border-none"
            }`}
          >
            <div className="flex items-center">
              <span className="mr-4 text-blue-500 cursor-pointer">
                {country.country}
              </span>
              <span className="text-sm text-gray-500">
                {country.reports} Reports
              </span>
            </div>
            <div className="flex items-center">
              <span className={`mr-2 text-sm text-gray-500`}>
                {country.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
