import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { addEmailContent, sendEmailContent } from "../service/api-service";

export default function AddReport() {
  const [page, setPage] = useState(1);
  const [emailContent, setEmailContent] = useState("");
  const [data, setData] = useState<Data>();
  const [id, setId] = useState("");

  const submitContent = async () => {
    type response = {
      data: { content: Data };
    };
    const data: response = await sendEmailContent(emailContent);
    setData(data.data.content);
    setPage(2);
  };

  const publishContent = async () => {
    if (!data) return console.log("No data");

    const dat = await addEmailContent(emailContent);
    setId(dat.data.id);
    console.log(dat);

    setPage(3);
  };

  return (
    <section className="">
      {page === 1 && (
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new report
          </h2>
          <label
            htmlFor="emailContent"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email Content
          </label>
          <textarea
            id="emailContent"
            rows={10}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Paste the email content here"
            onChange={(e) => setEmailContent(e.target.value)}
            value={emailContent}
          ></textarea>
          <div className="flex justify-between items-center">
            <Link
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              to={"/"}
            >
              Cancel
            </Link>
            <button
              type="button"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              onClick={() => submitContent()}
            >
              Go next
            </button>
          </div>
        </div>
      )}
      {/* Make a verify quick page just to show the displayed data. */}
      {page === 2 && (
        <div className="py-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Verify the Data
          </h1>
          <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-6 w-4/6 mx-auto">
            <div className="grid grid-cols-2 gap-12 mb-5">
              <div className="flex items-center space-x-4">
                <svg
                  className="w-6 h-6 text-blue-500 dark:text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Email:{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    {data?.from.value[0].address}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <svg
                  className="w-6 h-6 text-blue-500 dark:text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Username:{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    {data?.from.value[0].name || "No name"}
                  </span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div className="flex items-center space-x-4">
                <svg
                  className="w-6 h-6 text-blue-500 dark:text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Subject:{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    {data?.subject}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <svg
                  className="w-6 h-6 text-blue-500 dark:text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Message ID:{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    {data?.messageId}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center mt-10">
              <h6 className="text-gray-500">{data?.date}</h6>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="mt-8 mx-auto">
                <button
                  className=" bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300"
                  onClick={() => setPage(1)}
                >
                  Reject
                </button>
                <button
                  className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  onClick={() => publishContent()}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {page === 3 && <Navigate to={`/report/${id}`} />}s
    </section>
  );
}
