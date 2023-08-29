import React, { useState } from "react";
import { TabContext, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import {
  FaBug,
  FaCheckCircle,
  FaQuestion,
  FaQuestionCircle,
} from "react-icons/fa";

export default function GeneticAnalysis({
  data,
  relations,
}: {
  data: IDataOutput;
  relations: Relations;
}) {
  console.log(relations?.reports?.equalIPs);
  const [geneticAnalysisTab, setGeneticAnalysisTab] = useState("summary");

  // check if the vendor is a threat, if it is count it in
  /*const threatVendorsAmount = data?.vendors?.filter(
    (vendor) => vendor.isThreat === true
  ).length;
  const totalVendorsAmount = data?.vendors?.length;
  const safeVendorsAmount = totalVendorsAmount - threatVendorsAmount;*/

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
            <div className="flex flex-row">
              <TabContext value={geneticAnalysisTab}>
                <TabList className="mt-8" aria-label="Tabs">
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
                    onClick={() => console.log("DETAILS")}
                  />
                </TabList>
              </TabContext>
            </div>
          </div>

          {/* Genetic Summary Tab */}
          {geneticAnalysisTab === "summary" && (
            <div className="mt-8 dark:text-white">
              <div className="bg-surface p-4 flex flex-row text-white rounded-sm gap-5 items-center justify-between">
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
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-base font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400"
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
                            <div className="text-base dark:text-gray-600">
                              <a
                                href="#"
                                className="cursor-pointer text-red-600 text-lg flex items-center"
                              >
                                <FaBug className="mr-2" />
                                FickerStealer
                              </a>
                            </div>
                            <div className="mb-2 text-base w-48">
                              <div className="flex flex-row items-center gap-2">
                                <span className="text-lg font-semibold">
                                  82%
                                </span>
                                <span className="text-red-600 font-semibold">
                                  Malware
                                </span>
                              </div>
                            </div>
                            <div className="mb-2 text-base">
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
                            <div className="text-base dark:text-gray-600">
                              <a
                                href="#"
                                className="cursor-pointer text-gray-600 text-lg flex items-center"
                              >
                                <FaQuestionCircle className="mr-2" />
                                Unknown
                              </a>
                            </div>
                            <div className="mb-2 text-base w-48">
                              <div className="flex flex-row items-center gap-2">
                                <span className="text-lg font-semibold">
                                  N/A
                                </span>
                                <span className="text-gray-600 font-semibold">
                                  N/A
                                </span>
                              </div>
                            </div>
                            <div className="mb-2 text-base">
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
                            <div className="text-base dark:text-gray-600">
                              <a
                                href="#"
                                className="cursor-pointer text-green-600 text-lg flex items-center"
                              >
                                <FaCheckCircle className="mr-2" />
                                Google
                              </a>
                            </div>
                            <div className="mb-2 text-base w-48">
                              <div className="flex flex-row items-center gap-2">
                                <span className="text-lg font-semibold">
                                  100%
                                </span>
                                <span className="text-green-600 font-semibold">
                                  Trusted
                                </span>
                              </div>
                            </div>
                            <div className="mb-2 text-base">
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
                <div className="bg-white shadow dark:bg-surface overflow-hidden sm:rounded-lg text-base">
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
              <div className="dark:text-white">
                <hr className="dark:border-gray-700" />
                <h1 className="mb-2 mt-2 font-bold text-[1rem] flex flex-row items-center">
                  Relative IP Addresses ({relations?.reports?.equalIPs?.length})
                  <FaQuestionCircle
                    className="ml-2 text-blue-600 cursor-pointer"
                    size={14}
                  />
                </h1>
                <hr className="dark:border-gray-700" />

                <div>
                  <div className="flex flex-row justify-between mt-3 font-semibold dark:text-white">
                    <div className="w-2/12">
                      <h5 className="">IP Address</h5>
                    </div>
                    <div className="w-2/12">
                      <h5 className="">Verdict</h5>
                    </div>
                    <div className="w-2/12">
                      <h5 className="">Vendors</h5>
                    </div>
                    <div className="w-2/12">
                      <h5 className="">Tags</h5>
                    </div>
                  </div>

                  {relations?.reports?.equalIPs?.map(
                    (report: IDataOutput, index: number) => (
                      <div
                        className="flex flex-row justify-between mt-2"
                        key={index}
                      >
                        <div className="w-2/12">
                          <a
                            href={`/report/${report.reportId}`}
                            className="hover:text-blue-600 text-base"
                          >
                            {report.metadata.ip}
                          </a>
                        </div>
                        <div className="w-2/12 text-base">
                          <span
                            className={`${
                              data?.vendors?.filter(
                                (vendor) => vendor.isThreat === true
                              ).length > 0 && "text-red-600"
                            } ${
                              data?.vendors?.filter(
                                (vendor) => vendor.isThreat === true
                              ).length <= 0 && "text-green-500"
                            }`}
                          >
                            {report.verdict}
                          </span>
                        </div>
                        <div className="w-2/12">
                          <span className="text-gray-600 text-base">
                            <span
                              className={`${
                                data?.vendors?.filter(
                                  (vendor) => vendor.isThreat === true
                                ).length > 0 && "text-red-600"
                              } ${
                                data?.vendors?.filter(
                                  (vendor) => vendor.isThreat === true
                                ).length <= 0 && "text-green-500"
                              }`}
                            >
                              {
                                data?.vendors?.filter(
                                  (vendor) => vendor.isThreat === true
                                ).length
                              }
                            </span>{" "}
                            / {data.vendors.length}
                          </span>
                        </div>
                        <div className="w-2/12">
                          {report.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center mr-2 px-2.5 py-0.5 rounded-full text-base font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
