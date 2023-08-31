import { useState } from "react";

type TStringType = {
  name: string;
  display_name: string;
  families: TStringFamily[];
  color: string;
};

type TStringFamily = {
  name: string;
  display_name?: string;
  color: string;
};

type StringType = {
  string: string;
  tags: string[];
  family: string;
  familyType: string;
};

type TStrings = {
  familyTypes: TStringType[];
  strings: [
    {
      name: string;
      strings: StringType[];
    }
  ];
};

function StringsSection({ strings }: { strings: TStrings }) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");

  if (!strings) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400">
          No Strings Found
        </h2>
      </div>
    );
  }

  const handleFilterChange = (family: string) => {
    if (selectedFilters.includes(family)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== family));
    } else {
      setSelectedFilters([...selectedFilters, family]);
    }
  };

  const familyTypes = strings.familyTypes;

  // filter strings based on selected filters and search filter
  const filteredStrings = strings.strings.filter((string) => {
    if (string.strings.length === 0) {
      return false;
    }

    if (selectedFilters.length === 0 && searchFilter === "") {
      return true;
    }

    if (selectedFilters.length === 0 && searchFilter !== "") {
      return string.strings[0].string.includes(searchFilter);
    }

    if (selectedFilters.length !== 0 && searchFilter === "") {
      return selectedFilters.includes(string.strings[0].familyType);
    }

    if (selectedFilters.length !== 0 && searchFilter !== "") {
      return (
        selectedFilters.includes(string.strings[0].familyType) &&
        string.strings[0].string.includes(searchFilter)
      );
    }

    return false;
  });

  const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
  };

  return (
    <div className="mt-8 overflow-y-hidden">
      <div className="flex">
        {/* Sidebar for Filters */}
        <div className="w-1/4 px-4 mt-2">
          <input
            type="text"
            className="w-full mb-4 dark:bg-gray-800 dark:text-gray-400 border-0 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search strings..."
            onChange={handleSearchFilter}
            value={searchFilter}
          />

          <h2 className="text-lg font-bold mb-4 dark:text-white">Families</h2>

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
            {familyTypes.map((type) => (
              <li key={type.name} className="mb-2">
                <label className="flex items-center space-x-2 dark:text-white">
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(type.name)}
                    onChange={() => handleFilterChange(type.name)}
                    className={`rounded-sm text-blue-500 bg-transparent focus:outline-none focus-visible:outline-none focus:ring-transparent border`}
                    style={{ borderColor: type.color }}
                  />
                  <span>{type.display_name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Display Filtered Strings */}
        <div className="w-5/6 overflow-y-scroll overflow-x-hidden h-96">
          <ul className="">
            {filteredStrings.map((stringGroup, index) => (
              <li key={index} className="mb-4">
                <ul>
                  {stringGroup.strings.map((string, stringIndex) => (
                    <li
                      key={stringIndex}
                      className="text-base text-gray-600 dark:text-gray-400"
                    >
                      <div className="flex flex-row items-center justify-between py-2">
                        <div className="w-6/12 pr-4">{string.string}</div>
                        <div className="flex flex-row w-4/12 text-gray-500">
                          <span
                            className="mr-1 font-semibold"
                            style={{
                              color: familyTypes.find((type) => {
                                return type.name === string.familyType;
                              })?.color,
                            }}
                          >
                            {
                              strings.familyTypes.find((type) => {
                                return type.name === string.family;
                              })?.display_name
                            }
                          </span>
                          <span className="ml-4 text-gray-400">
                            {
                              strings.familyTypes
                                .find((type) => {
                                  return type.name === string.familyType;
                                })
                                ?.families.find((family) => {
                                  return family.name === string.family;
                                })?.display_name
                            }
                          </span>
                        </div>
                        <div className="flex flex-row items-center ml-2 w-1/12 space-x-2">
                          {string.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <hr className="my-2 dark:bg-gray-600" />
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
