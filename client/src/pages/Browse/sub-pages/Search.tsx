import Table from "../../../components/Table";

// ! Broken code..
export default function Search({ data }) {
  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Public Requests
      </h1>
      <div className="mb-6" /> {/* Add some margin bottom */}
      <Table
        data={data}
        showSearchBar={true}
        showAddButton={true}
        addButtonFunction={() => navigate("/add-report")}
        showPagination={true}
        loading={state.isLoading}
        headers={headers.map((header) => ({
          ...header,
          cellRender: (item) => {
            // Customize the cell content based on the header
            if (header.name === "Verdict") {
              return (
                <div className="flex items-center dark:text-white text-gray-950">
                  {item.verdict === "Threat" ? (
                    <FaExclamationTriangle className="w-5 h-5 text-red-600 mr-2" />
                  ) : (
                    <FaCheck className="w-5 h-5 text-green-600 mr-2" />
                  )}
                  {item.verdict || "Safe"}
                </div>
              );
            } else if (header.name === "Response") {
              return (
                <a
                  href={`/report/${item.reportId}`}
                  className="text-blue-500 dark:text-blue-300 hover:underline"
                >
                  {item.reportId} {"<"}
                  {item.data.from.value[0].address}
                  {">"}
                </a>
              );
            } else if (header.name === "Tags") {
              return (
                <div className="flex flex-row items-center">
                  {item?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              );
            } else if (header.name === "Date") {
              return (
                <div className="flex items-center dark:text-white text-gray-950">
                  {new Date(item.timestamp).toUTCString()}
                </div>
              );
            }
            // Default cell content if header not recognized
            return (
              <div className="flex items-center dark:text-white text-gray-950">
                {item[header.dataKey]}
              </div>
            );
          },
        }))}
      />
    </div>
  );
}
