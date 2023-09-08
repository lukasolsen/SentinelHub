import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { addEmailContent, sendEmailContent } from "../../service/api-service";
import { useData } from "../../context/DataContext";

export default function AddReport() {
  const { state } = useData();
  const [page, setPage] = useState(1);
  const [emailContent, setEmailContent] = useState("");
  const [data, setData] = useState<Data>();
  const [id, setId] = useState("");

  const submitContent = async () => {
    type response = { content: Data };
    const data: response = await sendEmailContent(
      emailContent,
      state?.user?.token
    );
    setData(data.content);
    setPage(2);
  };

  const publishContent = async () => {
    if (!data) return console.log("No data");

    const dat = await addEmailContent(emailContent, state?.user?.token);
    setId(dat.id);

    setPage(3);
  };

  return (
    <section className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      {page === 1 && (
        <div className="flex flex-col space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Report Suspicious Email
            </h2>
            <p className="text-gray-500 dark:text-gray-300">
              Help us analyze and protect against potential threats.
            </p>
          </div>
          <div className="w-full">
            <label
              htmlFor="emailContent"
              className="block text-sm font-medium text-gray-900 dark:text-white mb-1"
            >
              Paste Email Content
            </label>
            <textarea
              id="emailContent"
              rows={8}
              className="block w-full p-3 text-sm text-gray-900 bg-input-large rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-input-large dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:bg-card"
              placeholder="Paste the email content here..."
              onChange={(e) => setEmailContent(e.target.value)}
              value={emailContent}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <Link
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              to={"/"}
            >
              Cancel
            </Link>
            <button
              type="button"
              className="ml-4 inline-block px-4 py-2 text-sm font-medium dark:text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:outline-none focus:ring focus:ring-primary-200 text-bodyTextWhite"
              onClick={() => submitContent()}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Make a verify quick page just to show the displayed data. */}
      {page === 2 && (
        <div className="py-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Verify the Submitted Data
          </h1>
          <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-6 w-3/4 mx-auto">
            <div className="grid grid-cols-2 gap-6 mb-6">
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
                  Email:
                  <br />
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
                  Username:
                  <br />
                  <span className="text-gray-500 dark:text-gray-400">
                    {data?.from.value[0].name || "N/A"}
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
                  Subject:
                  <br />
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
                  Message ID:
                  <br />
                  <span className="text-gray-500 dark:text-gray-400">
                    {data?.messageId}
                  </span>
                </p>
              </div>
              {/* Add similar sections for other details */}
            </div>
            {/* ... (other details) */}
            <div className="flex justify-between items-center mt-8">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300"
                onClick={() => setPage(1)}
              >
                Edit
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
                onClick={() => publishContent()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {page === 3 && <Navigate to={`/report/${id}`} />}
    </section>
  );
}
