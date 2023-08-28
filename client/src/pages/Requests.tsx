import { useEffect, useState } from "react";
import { getEmails } from "../service/api-service";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

export default function Requests() {
  const [data, setData] = useState<ResponseData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emails = await getEmails();
        setData(emails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const maxPaginationButtons = 5; // Set the maximum number of pagination buttons to display

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

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
              ? "border-blue-500 border text-white"
              : "border-gray-200 border text-gray-600 dark:text-gray-400"
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
