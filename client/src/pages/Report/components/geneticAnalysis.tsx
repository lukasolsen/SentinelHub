import React, { useState } from "react";
import { TabContext, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import { FaBug, FaCheckCircle, FaQuestionCircle } from "react-icons/fa";

type Relations = {
  reports: {
    equalIPs: IDataOutput[];
    equalVerdicts: IDataOutput[];
  };
};

export default function GeneticAnalysis({ data, relations }) {
  console.log(relations?.reports?.equalIPs);
  const [geneticAnalysisTab, setGeneticAnalysisTab] = useState("summary");
  const [selectedSample, setSelectedSample] = useState("ip");

  return (
    <div className="mt-8">
      <div className="flex flex-row justify-between gap-6">
        <div className="w-4/12 h-3/6">
          <h2 className="dark:text-white text-xl">Attachments</h2>
          {data?.data.attachments?.map((attachment, index) => (
            <div className="mt-4 bg-surface rounded-md p-2" key={index}>
              <h4 className="dark:text-gray-200">{attachment.filename}</h4>
              <p className="dark:text-gray-500 mb-2">{attachment.checksum}</p>
              <p className="dark:text-gray-300">Feature not implemented</p>
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
                      label="Related Samples"
                      value="relatedSamples"
                      className={`py-4 px-1 text-center border-b-2 font-medium text-sm focus:outline-none ${
                        geneticAnalysisTab === "detection"
                          ? "text-indigo-600 border-indigo-500 dark:text-indigo-300 dark:border-indigo-700"
                          : "text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700"
                      }`}
                      onClick={() => setGeneticAnalysisTab("relatedSamples")}
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
            <div className="mt-8 dark:text-white">
              <div className="bg-surface p-4 flex flex-row dark:text-white rounded-sm gap-5 items-center justify-between">
                <div className="flex flex-row gap-2">
                  <h6 className="text-lg font-semibold">
                    d3d867c6722255ebcbc51a11a3a39347
                  </h6>
                  <span className="text-threat-threat font-bold">
                    FickerStealer
                  </span>
                </div>

                <div className="flex flex-row gap-2">
                  {data?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="bg-transparent border-teal-600 rounded-md border p-1">
                  Actions
                </button>
              </div>
              {/*
              <div className="mt-8">
                <ul>
                  <li className="bg-white dark:bg-surface shadow-md rounded-md p-4 mb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex flex-col">
                          <div className="relative pt-1">
                            <div className="text-xs dark:text-gray-600">
                              <a
                                href="#"
                                className="cursor-pointer text-red-600 text-lg flex items-center"
                              >
                                <FaBug className="mr-2" />
                                FickerStealer
                              </a>
                            </div>
                            <div className="mb-2 text-xs w-48">
                              <div className="flex flex-row items-center gap-2">
                                <span className="text-lg font-semibold">
                                  82%
                                </span>
                                <span className="text-red-600 font-semibold">
                                  Malware
                                </span>
                              </div>
                            </div>
                            <div className="mb-2 text-xs">
                              <a href="#" className="text-blue-600">
                                Explore Family
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="bg-white dark:bg-surface shadow-md rounded-md p-4 mb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex flex-col">
                          <div className="relative pt-1">
                            <div className="text-xs dark:text-gray-600">
                              <a
                                href="#"
                                className="cursor-pointer text-gray-600 text-lg flex items-center"
                              >
                                <FaQuestionCircle className="mr-2" />
                                Unknown
                              </a>
                            </div>
                            <div className="mb-2 text-xs w-48">
                              <div className="flex flex-row items-center gap-2">
                                <span className="text-lg font-semibold">
                                  N/A
                                </span>
                                <span className="text-gray-600 font-semibold">
                                  N/A
                                </span>
                              </div>
                            </div>
                            <div className="mb-2 text-xs">
                              <a href="#" className="text-blue-600 underline">
                                Explore Family
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="bg-white dark:bg-surface shadow-md rounded-md p-4 mb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex flex-col">
                          <div className="relative pt-1">
                            <div className="text-xs dark:text-gray-600">
                              <a
                                href="#"
                                className="cursor-pointer text-green-600 text-lg flex items-center"
                              >
                                <FaCheckCircle className="mr-2" />
                                Google
                              </a>
                            </div>
                            <div className="mb-2 text-xs w-48">
                              <div className="flex flex-row items-center gap-2">
                                <span className="text-lg font-semibold">
                                  100%
                                </span>
                                <span className="text-green-600 font-semibold">
                                  Trusted
                                </span>
                              </div>
                            </div>
                            <div className="mb-2 text-xs">
                              <a href="#" className="text-blue-600 underline">
                                Explore Family
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            */}

              <div className="mt-8">
                <h5>Email Metadata</h5>
                <div className="bg-white shadow dark:bg-surface overflow-hidden sm:rounded-lg">
                  {/* Dummy genetic summary content */}
                  <div className="p-6 dark:text-gray-400">
                    <div className="flex flex-row justify-between">
                      <p className="w-2/12">Size</p>
                      <p className="w-10/12">{data.metadata.size}</p>
                    </div>

                    <div className="flex flex-row justify-between">
                      <p className="w-2/12">SHA256</p>
                      <p className="w-10/12">{data.metadata.sha256}</p>
                    </div>

                    <div className="flex flex-row justify-between">
                      <p className="w-2/12">MD5</p>
                      <p className="w-10/12">{data.metadata.md5}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {geneticAnalysisTab === "relatedSamples" && (
            <div className="mt-8">
              <div className="flex flex-row">
                {/* Sidebar */}
                <div className="w-3/12 p-4 border-r border-gray-300 dark:border-gray-700">
                  <h3 className="dark:text-white text-lg mb-6 font-semibold">
                    Related IP's ({relations?.reports.equalIPs?.length} IP's)
                  </h3>
                  <ul className="space-y-3">
                    <li
                      className={`cursor-pointer flex items-center p-3 rounded-md transition duration-300 ${
                        selectedSample === "ip"
                          ? "bg-gray-800 text-white hover:bg-gray-800 border-l-indigo-600 border-l-2"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-900"
                      }`}
                      onClick={() => setSelectedSample("ip")}
                    >
                      <span className="text-lg font-semibold">
                        Related IP's
                      </span>
                    </li>
                    <li
                      className={`cursor-pointer flex items-center p-3 rounded-md transition duration-300 ${
                        selectedSample === "verdicts"
                          ? "bg-gray-800 text-white hover:bg-gray-800 border-l-indigo-600 border-l-2"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-900"
                      }`}
                      onClick={() => setSelectedSample("verdicts")}
                    >
                      <span className="text-lg font-semibold">
                        Related Verdicts
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Selected Family Section */}
                <div className="flex-grow p-4 bg-white dark:bg-surface rounded-md dark:text-white">
                  <h3 className="dark:text-white text-2xl mb-6 font-semibold">
                    {selectedSample === "ip"
                      ? "Related IP's"
                      : selectedSample === "verdicts"
                      ? "Related Verdicts"
                      : "Select a filter"}
                  </h3>

                  <ul className="space-y-3">
                    {selectedSample === "ip" &&
                      relations?.reports.equalIPs?.map(
                        (family: IDataOutput, index) => (
                          <li
                            key={index}
                            className={`flex items-center p-3 rounded-md transition duration-300
                              "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300`}
                          >
                            {family.verdict === "Threat" && (
                              <FaBug className="text-red-600 mr-2 text-lg" />
                            )}
                            {family.verdict === "Safe" && (
                              <FaCheckCircle className="text-green-600 mr-2 text-lg" />
                            )}
                            <span className="text-lg font-semibold">
                              {family.metadata.ip}
                            </span>
                          </li>
                        )
                      )}

                    {selectedSample === "verdicts" &&
                      relations?.reports.equalIPs?.map(
                        (family: IDataOutput, index) => (
                          <li
                            key={index}
                            className={`flex items-center p-3 rounded-md transition duration-300
                              "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300`}
                          >
                            {family.verdict === "Threat" && (
                              <FaBug className="text-red-600 mr-2 text-lg" />
                            )}
                            {family.verdict === "Safe" && (
                              <FaCheckCircle className="text-green-600 mr-2 text-lg" />
                            )}
                            <span className="text-lg font-semibold">
                              {family.metadata.ip}
                            </span>
                          </li>
                        )
                      )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
