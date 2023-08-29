import { useEffect, useState } from "react";
import DetectionWheel from "../../components/DetectionWheel";
import { useParams } from "react-router-dom";
import { getEmail, getRelatedReports } from "../../service/api-service";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import GeneticAnalysis from "./components/geneticAnalysis";
import Tab from "@mui/material/Tab";
import { TabContext, TabList } from "@mui/lab";

const ReportHeader = ({ vendors }: { vendors: IDataOutput }) => (
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

const Report = () => {
  const [currentTab, setCurrentTab] = useState("geneticAnalysis");

  const [data, setData] = useState<IDataOutput>();
  const [relations, setRelations] = useState<Relations>();
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
    if (!data) return;
    getRelatedReports(data?.metadata?.ip, data?.reportId, data?.verdict).then(
      (data) => {
        setRelations(data);
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
            <p className="text-xl dark:text-white text-bodyTextWhite">
              Hash: {data?.emailHash}
            </p>
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
          {currentTab === "geneticAnalysis" && (
            <GeneticAnalysis data={data} relations={relations} />
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
                    data.vendors
                      .slice()
                      .sort((a, b) => {
                        if (a.isThreat && !b.isThreat) return -1;
                        if (!a.isThreat && b.isThreat) return 1;
                        return a.name.localeCompare(b.name);
                      })
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
                                      <FaExclamationTriangle className="text-red-600 ml-2" />
                                    )}
                                    {/* Display tags if any */}
                                    {vendor.data?.tags && (
                                      <div className="sm:flex sm:items-center w-6/12">
                                        {vendor.data?.tags?.map(
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
                                {data.vendors[index + 1] && (
                                  <div className="text-lg leading-6 font-medium text-gray-900 dark:text-white w-1/2">
                                    <div className="flex flex-row items-center w-full">
                                      <h3 className="w-10/12">
                                        {data.vendors[index + 1].name}
                                      </h3>
                                      {!data.vendors[index + 1].isThreat && (
                                        <FaCheck className="text-green-500 ml-2 w-2/12" />
                                      )}

                                      {data.vendors[index + 1].isThreat && (
                                        <FaExclamationTriangle className="text-red-600 ml-2 w-2/12" />
                                      )}

                                      {/* Display tags if any */}
                                      {vendor.data?.tags && (
                                        <div className="sm:flex sm:items-center w-6/12">
                                          {vendor.data?.tags?.map(
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
          <h1 className="text-2xl font-bold dark:text-white">Loading...</h1>
          <p className="dark:text-gray-400 mb-4">
            Make sure you have the correct report ID.
          </p>
          <h2 className="text-xl font-bold mb-4 dark:text-white">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </h2>

          <div className="flex flex-row">
            <a
              className="bg-card hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded mr-2 h-36 w-36 shadow-sm cursor-pointer"
              href="/"
            >
              Home
            </a>
            <a
              className="bg-card hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded mr-2 h-36 w-36 shadow-sm cursor-pointer"
              href="/"
            >
              Database
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
