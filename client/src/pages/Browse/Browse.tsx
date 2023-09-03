import { useEffect, useState } from "react";
import { getEmails } from "../../service/api-service";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import Statistics from "./scenes/Statistics";
import { RiSearch2Line, RiFilter3Line } from "react-icons/ri";

export default function Requests() {
  const [data, setData] = useState<IDataOutput[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const getData = async () => {
    try {
      const emails = await getEmails();
      setData(emails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterSelection = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const filteredData = data
    .filter((item) =>
      item.verdict
        ? item.verdict.toLowerCase().includes(searchTerm.toLowerCase())
        : "safe".includes(searchTerm.toLowerCase())
    )
    .filter(
      (item) =>
        selectedFilters.length === 0 ||
        selectedFilters.some((filter) => item.tags.includes(filter))
    );

  const totalPages = Math.ceil(filteredData.length / 10);
  const currentData = filteredData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );
  const maxPaginationButtons = 5;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //TODO: Fix bug, when you click on the last page, it doesn't show the second page.
  const renderPaginationButtons = () => {
    const pagesToShow = Math.min(totalPages, maxPaginationButtons);
    const middlePage = Math.ceil(maxPaginationButtons / 2);
    let startPage = Math.max(1, currentPage - middlePage + 1);
    const endPage = Math.min(totalPages, startPage + maxPaginationButtons - 1);

    const buttons = [];

    if (currentPage > middlePage) {
      buttons.push(
        <button
          key={1}
          className={`px-4 py-2 rounded-lg border-gray-200 border text-gray-600 dark:text-gray-400`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (currentPage !== middlePage + 1 && currentPage !== middlePage + 2) {
        buttons.push(
          <span key={"ellipsis-left"} className="px-2">
            ...
          </span>
        );
      }
    } else {
      startPage = 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`px-4 py-2 rounded-lg ${
            i === currentPage
              ? "border-blue-500 border dark:text-white text-bodyTextWhite"
              : "border-gray-200 border text-bodyTextWhite dark:text-gray-400"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - middlePage + 1) {
      if (
        currentPage !== totalPages - middlePage &&
        currentPage !== totalPages - middlePage - 1
      ) {
        if (totalPages > maxPaginationButtons) {
          buttons.push(
            <span key={"ellipsis-right"} className="px-2">
              ...
            </span>
          );
        }
        buttons.push(
          <button
            key={totalPages}
            className={`px-4 py-2 rounded-lg border-gray-200 border text-gray-600 dark:text-gray-400`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Public Requests
      </h1>
      <Statistics />
      <div className="mb-6" /> {/* Add some margin bottom */}
      {/* Search and filter bar */}
      <div className="flex flex-row justify-between items-center gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-8 pr-4 py-2 dark:bg-gray-800 dark:text-gray-400 border-0 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <RiSearch2Line className="text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none"
            onClick={handleFilterToggle}
          >
            <RiFilter3Line className="text-xl mr-1" />
            Filters
          </button>
          {showFilters && (
            <div className="flex space-x-2">
              {/* Add your filter buttons here */}
              <button
                onClick={() => handleFilterSelection("Tag1")}
                className={`px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 ${
                  selectedFilters.includes("Tag1")
                    ? "bg-blue-500 text-white dark:bg-blue-500 dark:text-gray-100"
                    : "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                Tag1
              </button>
              <button
                onClick={() => handleFilterSelection("Tag2")}
                className={`px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 ${
                  selectedFilters.includes("Tag2")
                    ? "bg-blue-500 text-white dark:bg-blue-500 dark:text-gray-100"
                    : "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                Tag2
              </button>
              {/* Add more filter buttons as needed */}
            </div>
          )}
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left dark:text-white text-gray-900 w-1/6">
              <div>
                Verdict
                <hr className="border-gray-700 dark:border-gray-100 border w-full" />
              </div>
            </th>
            <th className="py-3 px-6 text-left dark:text-white text-gray-900">
              <div>
                Response
                <hr className="border-gray-700 dark:border-gray-100 border w-full" />
              </div>
            </th>
            <th className="py-3 px-6 text-left dark:text-white text-gray-900">
              <div>
                Tags
                <hr className="border-gray-700 dark:border-gray-100 border w-full" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((d, index) => (
            <tr key={index}>
              <td className="py-4 px-6">
                <div className="flex items-center dark:text-white text-gray-950">
                  {d.verdict ? (
                    d.verdict === "Threat" ? (
                      <FaExclamationTriangle className="w-5 h-5 text-red-600 mr-2" />
                    ) : (
                      <FaCheck className="w-5 h-5 text-green-600 mr-2" />
                    )
                  ) : (
                    <FaCheck className="w-5 h-5 text-green-600 dark:text-green-300 mr-2" />
                  )}
                  {d.verdict || "Safe"}
                </div>
              </td>
              <td className="py-4 px-6">
                <a
                  href={`/report/${d.reportId}`}
                  className="text-blue-500 dark:text-blue-300 hover:underline"
                >
                  {d.reportId} {"<"}
                  {d.data.from.value[0].address}
                  {">"}
                </a>
              </td>
              <td className="py-4 px-6">
                <div key={index} className="flex flex-row items-center">
                  {d.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-6 space-x-2">
        {renderPaginationButtons()}
      </div>
    </div>
  );
}
