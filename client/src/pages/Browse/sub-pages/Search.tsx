import React from "react";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import Table from "../../../components/Table";
import { useData } from "../../../context/DataContext";
import { searchReports } from "../../../service/api-service";
import { useNavigate } from "react-router-dom";
import { TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";

function getStatusIcon(verdict: string) {
  if (verdict === "Threat") {
    return <FaExclamationTriangle className="w-5 h-5 text-red-600 mr-2" />;
  } else {
    return <FaCheck className="w-5 h-5 text-green-600 mr-2" />;
  }
}

function getTags(tags: string[]) {
  return (
    <div className="flex flex-row items-center">
      {tags?.map((tag: string, index: number) => (
        <span
          key={index}
          className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function formatDate(timestamp: string) {
  return (
    <div className="flex items-center dark:text-white text-gray-950">
      {new Date(timestamp).toUTCString()}
    </div>
  );
}

export default function Search() {
  //get data from api, get the search query from the "/search/:query" route
  const [tab, setTab] = React.useState("reports");
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState<boolean>(false); //TODO: add error handling
  const { state, dispatch } = useData();
  const queryParameters = new URLSearchParams(location.search);
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    searchReports(queryParameters.get("query")).then((res) => {
      console.log(res);
      if (res.error || res.length === 0) {
        setError(true);
        dispatch({ type: "SET_LOADING", payload: false });
        return;
      }
      if (res.length === 1) {
        navigate(`/report/${res[0].reportId}`);
        return;
      }
      setData(res);
      dispatch({ type: "SET_LOADING", payload: false });
    });
  }, []);

  const headers = [
    {
      name: "Verdict",
      cellRender: (item) => (
        <div className="flex items-center dark:text-white text-gray-950">
          {getStatusIcon(item.verdict)}
          {item.verdict || "Safe"}
        </div>
      ),
    },
    {
      name: "Response",
      cellRender: (item) => (
        <a
          href={`/report/${item.reportId}`}
          className="text-blue-500 dark:text-blue-300 hover:underline"
        >
          {item.reportId} {"<"}
          {item.data.from.value[0].address}
          {">"}
        </a>
      ),
    },
    {
      name: "Tags",
      cellRender: (item) => getTags(item.tags),
    },
    {
      name: "Date",
      cellRender: (item) => formatDate(item.timestamp),
    },
    // Add more headers as needed
  ];

  return (
    <div className="w-11/12 mx-auto">
      <div className="mb-6" /> {/* Add some margin bottom */}
      {error && (
        <div className="flex items-center justify-center">
          <h2 className="text-2xl dark:text-white text-bodyTextWhite font-semibold">
            No matches found
          </h2>
        </div>
      )}
      {!error && (
        <>
          <div className="flex flex-row items-center mb-8">
            <TabContext value={tab}>
              <TabList className="mt-8" aria-label="Tabs">
                <Tab
                  label={`Reports (${data.length})`}
                  value="reports"
                  className={`py-4 px-1 text-center border-b-2 font-medium text-sm focus:outline-none ${
                    tab === "reports"
                      ? "text-indigo-600 border-indigo-500 dark:text-indigo-300 dark:border-indigo-700"
                      : "text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700"
                  }`}
                  onClick={() => setTab("reports")}
                />
                <Tab
                  label="Families"
                  value="families"
                  className={`py-4 px-1 text-center border-b-2 font-medium text-sm focus:outline-none ${
                    tab === "families"
                      ? "text-indigo-600 border-indigo-500 dark:text-indigo-300 dark:border-indigo-700"
                      : "text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700"
                  }`}
                  onClick={() => setTab("families")}
                  disabled
                />
              </TabList>
            </TabContext>
          </div>

          <Table
            data={data}
            showPagination={true}
            loading={state.isLoading}
            headers={headers}
          />
        </>
      )}
    </div>
  );
}
