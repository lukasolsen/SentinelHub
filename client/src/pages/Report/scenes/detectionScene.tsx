import { useEffect, useState } from "react";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { getVendors } from "../../../service/api-service";

const Detections = ({ id }: { id: number }) => {
  const [data, setData] = useState();

  useEffect(() => {
    getVendors(id).then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        Security vendors' analysis
      </h2>
      <div className="bg-white shadow dark:bg-surface overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-300 dark:divide-gray-700">
          {data &&
            data
              .slice()
              .sort((a, b) => (a.threat && !b.isThreat ? -1 : 1))
              .map(
                (vendor, index) =>
                  index % 2 === 0 && (
                    <li
                      key={index}
                      className="px-4 py-4 sm:px-6 flex-row flex justify-between"
                    >
                      <div className="flex items-center w-full">
                        <div className="text-lg leading-6 font-medium text-gray-900 dark:text-white w-1/2">
                          <div className="flex flex-row items-center w-full">
                            <h3 className="w-10/12">{vendor.name}</h3>
                            {!vendor.isThreat && (
                              <FaCheck className="text-green-500 ml-2 w-2/12" />
                            )}
                            {vendor.isThreat && (
                              <FaExclamationTriangle className="text-red-600 ml-2 w-2/12" />
                            )}
                            {/* Display tags if any */}
                            {vendor.data?.tags && (
                              <div className="sm:flex sm:items-center w-6/12">
                                {vendor.data?.tags?.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        {data[index + 1] && (
                          <div className="text-lg leading-6 font-medium text-gray-900 dark:text-white w-1/2">
                            <div className="flex flex-row items-center w-full">
                              <h3 className="w-10/12">
                                {data[index + 1].name}
                              </h3>
                              {!data[index + 1].isThreat && (
                                <FaCheck className="text-green-500 ml-2 w-2/12" />
                              )}

                              {data[index + 1].isThreat && (
                                <FaExclamationTriangle className="text-red-600 ml-2 w-2/12" />
                              )}

                              {/* Display tags if any */}
                              {data[index + 1].data?.tags && (
                                <div className="sm:flex sm:items-center w-6/12">
                                  {data[index + 1].data?.tags?.map(
                                    (tag, index) => (
                                      <span
                                        key={index}
                                        className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400"
                                      >
                                        {tag}
                                      </span>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="sm:flex sm:justify-between sm:items-center">
                        {vendor.data?.tags && (
                          <div className="sm:flex sm:items-center">
                            {vendor.data?.tags?.map((tag, index) => (
                              <span
                                key={index}
                                className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </li>
                  )
              )}
        </ul>
      </div>
    </div>
  );
};

export default Detections;
