import { useEffect, useState } from "react";
import DetectionWheel from "../components/DetectionWheel";
import { useParams } from "react-router-dom";
import { getEmail } from "../service/api-service";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import Tab from "@mui/material/Tab";
import { TabContext, TabList } from "@mui/lab";

const ReportHeader = ({ vendors }: ResponseData) => (
  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    {vendors.length > 0 && (
      <dd className="mt-1 sm:mt-0 sm:col-span-2">
        <DetectionWheel
          totalVendors={vendors.length}
          threatVendors={vendors.filter((vendor) => vendor.isThreat).length}
          unsecureVendors={0}
        />
      </dd>
    )}
  </div>
);

const TabButton = ({ tabName, currentTab }) => (
  <Tab
    className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm focus:outline-none ${
      currentTab === tabName
        ? "text-indigo-600 border-indigo-500 dark:text-indigo-300 dark:border-indigo-700"
        : "text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700"
    }`}
    label={tabName}
    value={tabName}
  />
);

const Report = () => {
  const [currentTab, setCurrentTab] = useState("geneticAnalysis");
  const [geneticAnalysisTab, setGeneticAnalysisTab] = useState("summary");
  const [data, setData] = useState<ResponseData>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getEmail(id).then((data: ResponseData) => {
      if (data) setLoading(false);
      setData(data);
      console.log(data);
    });
  }, [id]);

  console.log(data);

  return (
    <div className="container mx-auto px-4 py-8">
      {!loading && data && (
        <div>
          <div
            className={`
            ${
              (data.threat !== "Safe" && "bg-threat-threat") ||
              (data.threat === "Safe" && "bg-threat-safe")
            }
            } rounded-md p-4 mb-4`}
          >
            <h2 className="text-sm font-bold text-gray-400">
              Report for <span className="text-blue-500 underline">#{id}</span>
            </h2>
            <p className="text-xl text-white">Hash: {data?.hash}</p>
            {data.vendors?.some((vendor) => vendor.data?.tags) && (
              <div className="flex flex-row items-center mt-2">
                {/* Display all the tags from all vendors */}
                {data.vendors.map((vendor, index) => (
                  <div key={index} className="flex flex-row items-center">
                    {vendor.data?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tabs */}
          <TabContext value={currentTab}>
            <TabList
              className="mt-8 border-b border-gray-200 dark:border-gray-700"
              aria-label="Tabs"
            >
              <Tab
                label="Genetic Analysis"
                value="geneticAnalysis"
                className={`py-4 px-1 text-center border-b-2 font-medium text-sm focus:outline-none ${
                  currentTab === "genetic-analysis"
                    ? "text-indigo-600 border-indigo-500 dark:text-indigo-300 dark:border-indigo-700"
                    : "text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700"
                }`}
                onClick={() => setCurrentTab("geneticAnalysis")}
              />
              <Tab
                label="Detection"
                value="detection"
                className={`py-4 px-1 text-center border-b-2 font-medium text-sm focus:outline-none ${
                  currentTab === "detection"
                    ? "text-indigo-600 border-indigo-500 dark:text-indigo-300 dark:border-indigo-700"
                    : "text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700"
                }`}
                onClick={() => setCurrentTab("detection")}
              />
              <Tab
                label="Details"
                value="details"
                className={`py-4 px-1 text-center border-b-2 font-medium text-sm focus:outline-none ${
                  currentTab === "details"
                    ? "text-indigo-600 border-indigo-500 dark:text-indigo-300 dark:border-indigo-700"
                    : "text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700"
                }`}
                onClick={() => setCurrentTab("details")}
              />
            </TabList>
          </TabContext>

          {/* Genetic Analysis Tab */}
          {currentTab === "geneticAnalysis" && (
            <div className="mt-8">
              <div className="flex flex-row justify-between gap-6">
                <div className="w-4/12 h-3/6">
                  <h2 className="dark:text-white text-xl">Attachments</h2>
                  {data?.data.attachments?.map((attachment, index) => (
                    <div className="mt-4 bg-surface rounded-md p-2" key={index}>
                      <h4 className="dark:text-gray-200">
                        {attachment.filename}
                      </h4>
                      <p className="dark:text-gray-500 mb-2">
                        {attachment.checksum}
                      </p>
                      <p className="dark:text-gray-300">
                        Feature not implemented
                      </p>
                    </div>
                  ))}

                  {data?.data.attachments?.length === 0 && (
                    <div>
                      <p className="dark:text-gray-300">No attachments</p>
                    </div>
                  )}
                </div>

                <div className="w-8/12">
                  {/* Tabs */}
                  <div className="relative">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                      <div className="flex flex-row">
                        <TabContext value={geneticAnalysisTab}>
                          <TabList
                            className="mt-8 border-b border-gray-200 dark:border-gray-700"
                            aria-label="Tabs"
                          >
                            <Tab
                              label="Genetic Summary"
                              value="summary"
                              className={`py-4 px-1 text-center border-b-2 font-medium text-sm focus:outline-none ${
                                geneticAnalysisTab === "summary"
                                  ? "text-indigo-600 border-indigo-500 dark:text-indigo-300 dark:border-indigo-700"
                                  : "text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700"
                              }`}
                              onClick={() => setGeneticAnalysisTab("summary")}
                            />
                            <Tab
                              label="Detection"
                              value="detection"
                              className={`py-4 px-1 text-center border-b-2 font-medium text-sm focus:outline-none ${
                                geneticAnalysisTab === "detection"
                                  ? "text-indigo-600 border-indigo-500 dark:text-indigo-300 dark:border-indigo-700"
                                  : "text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700"
                              }`}
                              onClick={() => setCurrentTab("detection")}
                            />
                            <Tab
                              label="Details"
                              value="details"
                              className={`py-4 px-1 text-center border-b-2 font-medium text-sm focus:outline-none ${
                                geneticAnalysisTab === "details"
                                  ? "text-indigo-600 border-indigo-500 dark:text-indigo-300 dark:border-indigo-700"
                                  : "text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700"
                              }`}
                              onClick={() => setCurrentTab("details")}
                            />
                          </TabList>
                        </TabContext>
                      </div>
                    </div>
                  </div>

                  {/* Genetic Summary Tab */}
                  {geneticAnalysisTab === "summary" && (
                    <div className="mt-8">
                      <h2 className="text-xl font-bold mb-4 dark:text-white">
                        Genetic Summary
                      </h2>

                      <h5>Email Metadata</h5>
                      <div className="bg-white shadow dark:bg-surface overflow-hidden sm:rounded-lg">
                        {/* Dummy genetic summary content */}
                        <div className="p-6 dark:text-gray-400">
                          <div className="flex flex-row justify-between">
                            <p className="w-2/12">Size</p>
                            <p className="w-10/12">16 KB</p>
                          </div>

                          <div className="flex flex-row justify-between">
                            <p className="w-2/12">SHA256</p>
                            <p className="w-10/12">
                              b08319b4cda292dc1cbe771226fa7ac1
                            </p>
                          </div>

                          <div className="flex flex-row justify-between">
                            <p className="w-2/12">MD5</p>
                            <p className="w-10/12">
                              b08319b4cda292dc1cbe771226fa7ac1
                            </p>
                          </div>
                          <div className="flex flex-row justify-between">
                            <p className="w-2/12">MD5</p>
                            <p className="w-10/12">
                              b08319b4cda292dc1cbe771226fa7ac1
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white shadow dark:bg-surface overflow-hidden sm:rounded-lg">
                        {/* Dummy genetic summary content */}
                        <div className="p-6 dark:text-gray-400">
                          <p className="text-lg font-semibold mb-2">
                            Genetic Summary:
                          </p>
                          <p className="mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Phasellus aliquam finibus fringilla.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Detection Tab */}
          {currentTab === "detection" && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Security vendors' analysis
              </h2>
              <div className="bg-white shadow dark:bg-surface overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-300 dark:divide-gray-700">
                  {data.vendors &&
                    data.vendors.map((vendor, index) => (
                      <li
                        key={index}
                        className="px-4 py-4 sm:px-6 flex-row flex items-center justify-between"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                            <div className="flex flex-row items-center justify-evenly">
                              {!vendor.isThreat && (
                                <FaCheck className="text-severity-success mr-2" />
                              )}

                              {vendor.isThreat && (
                                <FaExclamationTriangle className="w-5 h-5 text-red-600 mr-2" />
                              )}

                              <h3>{vendor.name}</h3>
                            </div>
                          </div>
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
                    ))}
                </ul>
              </div>
            </div>
          )}

          {/* Details Tab */}
          {currentTab === "details" && (
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

      {loading && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">
            Email Report
          </h1>
          <h2 className="text-xl font-bold mb-4 dark:text-white">Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default Report;
