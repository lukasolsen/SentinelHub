import { useState } from "react";
import { Link } from "react-router-dom";
import { addEmailContent, sendEmailContent } from "../service/api-service";

export default function Report() {
  const [page, setPage] = useState(1);
  const [emailContent, setEmailContent] = useState("");
  const [data, setData] = useState<Data>();

  const submitContent = async () => {
    type response = {
      data: { content: Data };
    };
    const data: response = await sendEmailContent(emailContent);
    setData(data.data.content);
    console.log(data.data.content.from.value[0].address);
    setPage(2);
  };

  const publishContent = async () => {
    if (!data) return console.log("No data");
    const dat = await addEmailContent(JSON.stringify(data));
    console.log(dat);
  };

  return (
    <section className="">
      <div className="flex items-center justify-center w-screen">
        <ol className="flex items-center w-full mb-4 sm:mb-5">
          <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
              <svg
                className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
              </svg>
            </div>
          </li>
          <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              <svg
                className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
                <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
              </svg>
            </div>
          </li>
          <li className="flex items-center w-full">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              <svg
                className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
              </svg>
            </div>
          </li>
        </ol>
      </div>
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
            rows={4}
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
                  <Link to={"/"}>Accept</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
