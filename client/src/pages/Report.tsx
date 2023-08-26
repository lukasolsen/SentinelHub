import React, { useEffect, useState } from "react";
import DetectionWheel from "../components/DetectionWheel";
import { Badge } from "../components/comps/Badge";
import { useParams } from "react-router-dom";
import { getEmail } from "../service/api-service";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const vendorsData = [
  {
    name: "Vendor A",
    tags: ["Trojan", "Malware"],
    detectionRate: "90%",
    lastUpdated: "2023-08-25",
  },
  {
    name: "Vendor B",
    tags: ["Virus", "Spyware"],
    detectionRate: "85%",
    lastUpdated: "2023-08-24",
  },
  // ... Add more vendor data
];

const ReportHeader = ({ vendors }: ResponseData) => (
  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dd className="mt-1 sm:mt-0 sm:col-span-2">
      <DetectionWheel
        totalVendors={vendors.length}
        threatVendors={vendors.filter((vendor) => vendor.isThreat).length}
        unsecureVendors={0}
      />
    </dd>
  </div>
);

const Report = () => {
  const [tab, setTab] = useState("detection");
  const [data, setData] = useState<ResponseData>();
  const { id } = useParams();

  useEffect(() => {
    getEmail(id).then((data: ResponseData) => {
      setData(data);
      console.log(data);
    });
  }, [id]);

  const isActiveTab = (tabName) => tab === tabName;
  const tabButtonClasses = (tabName) =>
    `w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm focus:outline-none ${
      isActiveTab(tabName)
        ? "text-indigo-600 border-indigo-500 dark:text-indigo-300 dark:border-indigo-700"
        : "text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700"
    }`;

  return (
    <div className="container mx-auto px-4 py-8">
      {data && (
        <div>
          <div className="flex flex-row items-center justify-between w-6/12">
            <ReportHeader vendors={data?.vendors} />
            <h1 className="text-2xl font-bold mb-4 dark:text-white">
              Email Report
            </h1>
          </div>

          <div
            className={`
            ${
              (data.threat !== "Safe" && "bg-threat-threat") ||
              (data.threat === "Safe" && "bg-severity-success")
            }
            } rounded-md p-4 mb-4`}
          >
            <h2 className="text-sm font-bold text-gray-400">
              Report for <span className="text-blue-500 underline">#{id}</span>
            </h2>
            <p className="text-xl text-white">Hash: {data?.hash}</p>
            {data.vendors?.some((vendor) => vendor.data[0]?.malware) && (
              <span className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400">
                {data.vendors
                  .map((vendor) => vendor.data[0]?.malware)
                  .join(", ")}
              </span>
            )}
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-row">
                <button
                  type="button"
                  className={tabButtonClasses("detection")}
                  onClick={() => setTab("detection")}
                >
                  Detection
                </button>
                <button
                  type="button"
                  className={tabButtonClasses("details")}
                  onClick={() => setTab("details")}
                >
                  Details
                </button>
              </div>
            </div>
          </div>

          {/* Detection Tab */}
          {isActiveTab("detection") && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Security vendors' analysis
              </h2>
              <div className="bg-white shadow dark:bg-surface overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-300 dark:divide-gray-700">
                  {data.vendors &&
                    data.vendors.map((vendor, index) => (
                      <li key={index} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                            <div className="flex flex-row items-center justify-evenly">
                              {!vendor.isThreat && (
                                <FaCheck className="text-severity-success mr-2" />
                              )}

                              {vendor.isThreat && (
                                <FaXmark className="text-threat-threat mr-2" />
                              )}

                              <h3>{vendor.name}</h3>
                            </div>
                          </div>

                          {vendor.data[0]?.status && (
                            <div
                              className={`text-sm text-gray-500 dark:text-gray-400 ${
                                vendor.data[0].status === "online" &&
                                "dark:text-green-500 text-green-500"
                              } ${
                                vendor.data[0].status === "offline" &&
                                "dark:text-red-500 text-red-500"
                              }`}
                            >
                              {vendor.data[0].status}
                            </div>
                          )}
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          {vendor.data[0]?.malware && (
                            <div className="sm:flex">
                              <span className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400">
                                {vendor.data[0]?.malware}
                              </span>
                            </div>
                          )}
                          {vendor.data[0]?.status && (
                            <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                              Last seen online: {vendor.data[0]?.last_online}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}

          {/* Details Tab */}
          {isActiveTab("details") && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Email Details
              </h2>
              <div className="bg-white shadow dark:bg-surface overflow-hidden sm:rounded-lg">
                {/* Dummy details content */}
                <div className="p-6 dark:text-gray-400">
                  <p className="text-lg font-semibold mb-2">Subject:</p>
                  <p className="mb-4">{data.data.subject}</p>

                  <p className="text-lg font-semibold mb-2">From:</p>
                  <p className="mb-4">{data.data.from.value[0].address}</p>

                  <p className="text-lg font-semibold mb-2">Contents:</p>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus aliquam finibus fringilla.
                  </p>

                  {/* Add more details */}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!data ||
        !data.vendors ||
        (data.vendors.length > 1 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">
              Email Report
            </h1>
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Loading...
            </h2>
          </div>
        ))}
    </div>
  );
};

export default Report;
