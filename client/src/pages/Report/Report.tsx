import { useEffect, useState } from "react";
import DetectionWheel from "../../components/DetectionWheel";
import { useParams } from "react-router-dom";
import { getEmail, getRelatedReports } from "../../service/api-service";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import GeneticAnalysis from "./components/geneticAnalysis";
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

  const [data, setData] = useState<IDataOutput>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getEmail(id).then((data: IDataOutput) => {
      if (!data.error) setLoading(false);
      setData(data);
      console.log(data);
    });
  }, [id]);

  useEffect(() => {
    getRelatedReports(data?.metadata?.ip, data?.reportId, data?.verdict).then(
      (data) => {
        console.log(data);
      }
    );
  }, [data]);

  return (
    <div className="container mx-auto px-4 py-8">
      {!loading && data && (
        <div>
          <div
            className={`
            ${
              (data.verdict !== "Safe" && "bg-threat-threat") ||
              (data.verdict === "Safe" && "bg-threat-safe")
            }
            } rounded-md p-4 mb-4`}
          >
            <h2 className="text-sm font-bold text-gray-400">
              Report for <span className="text-blue-500 underline">#{id}</span>
            </h2>
            <p className="text-xl text-white">Hash: {data?.emailHash}</p>
            <div className="flex flex-row items-center mt-2">
              {/* Display all the tags from all vendors */}
              {data?.tags.map((tag, index) => (
                <span
                  key={index}
                  className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
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
          {currentTab === "geneticAnalysis" && <GeneticAnalysis data={data} />}
          {/* Detection Tab */}
          {currentTab === "detection" && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Security vendors' analysis
              </h2>
              <div className="bg-white shadow dark:bg-surface overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-300 dark:divide-gray-700">
                  {data.vendors &&
                    data.vendors
                      .slice()
                      .sort((a, b) => {
                        // Sort by threat status first, then by name
                        if (a.isThreat && !b.isThreat) return -1;
                        if (!a.isThreat && b.isThreat) return 1;
                        return a.name.localeCompare(b.name);
                      })
                      .map((vendor, index) => (
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
