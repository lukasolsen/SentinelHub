import { useState, useEffect } from "react";
import {
  FaUser,
  FaCode,
  FaInfo,
  FaListAlt,
  FaArrowLeft,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveCalendar } from "@nivo/calendar";
import { Link } from "react-router-dom";
import Table from "../../components/Table";

const LineChart = ({ data }: { data: any }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "transportation",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

const CalendarChart = ({ data }: { data: any }) => (
  <ResponsiveCalendar
    data={data}
    from="2015-03-01"
    to="2016-07-12"
    emptyColor="#eeeeee"
    colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
    yearSpacing={40}
    monthBorderColor="#ffffff"
    dayBorderWidth={2}
    dayBorderColor="#ffffff"
    legends={[
      {
        anchor: "bottom-right",
        direction: "row",
        translateY: 36,
        itemCount: 4,
        itemWidth: 42,
        itemHeight: 36,
        itemsSpacing: 14,
        itemDirection: "right-to-left",
      },
    ]}
  />
);

export default function Profile() {
  const exampleCalendarData = [
    {
      value: 359,
      day: "2017-12-29",
    },
    {
      value: 227,
      day: "2016-03-18",
    },
    {
      value: 67,
      day: "2017-05-02",
    },
    {
      value: 103,
      day: "2018-01-23",
    },
    {
      value: 106,
      day: "2017-03-22",
    },
    {
      value: 18,
      day: "2018-01-08",
    },
    {
      value: 340,
      day: "2018-02-09",
    },
    {
      value: 51,
      day: "2017-11-03",
    },
    {
      value: 176,
      day: "2015-04-01",
    },
    {
      value: 382,
      day: "2016-03-06",
    },
    {
      value: 46,
      day: "2015-08-02",
    },
    {
      value: 105,
      day: "2018-04-26",
    },
    {
      value: 104,
      day: "2018-08-11",
    },
    {
      value: 23,
      day: "2017-04-10",
    },
    {
      value: 366,
      day: "2015-08-09",
    },
    {
      value: 222,
      day: "2017-04-18",
    },
    {
      value: 69,
      day: "2018-02-12",
    },
    {
      value: 168,
      day: "2015-08-26",
    },
    {
      value: 365,
      day: "2015-05-28",
    },
    {
      value: 325,
      day: "2016-06-25",
    },
    {
      value: 332,
      day: "2015-12-25",
    },
    {
      value: 257,
      day: "2015-04-30",
    },
    {
      value: 300,
      day: "2017-08-26",
    },
    {
      value: 154,
      day: "2018-05-17",
    },

    {
      value: 162,
      day: "2016-06-19",
    },
    {
      value: 214,
      day: "2018-03-22",
    },
    {
      value: 122,
      day: "2016-10-23",
    },
    {
      value: 188,
      day: "2018-02-14",
    },
    {
      value: 374,
      day: "2018-01-21",
    },
    {
      value: 29,
      day: "2015-04-27",
    },
    {
      value: 224,
      day: "2016-05-02",
    },
    {
      value: 40,
      day: "2015-05-06",
    },
    {
      value: 241,
      day: "2018-07-25",
    },
    {
      value: 163,
      day: "2016-10-16",
    },
    {
      value: 235,
      day: "2015-07-01",
    },
    {
      value: 166,
      day: "2018-07-27",
    },
    {
      value: 341,
      day: "2017-10-14",
    },
    {
      value: 199,
      day: "2017-09-22",
    },
    {
      value: 145,
      day: "2017-10-23",
    },
    {
      value: 112,
      day: "2015-11-26",
    },
    {
      value: 342,
      day: "2017-11-16",
    },
    {
      value: 156,
      day: "2018-03-19",
    },
    {
      value: 230,
      day: "2017-11-02",
    },
    {
      value: 256,
      day: "2018-07-05",
    },
    {
      value: 165,
      day: "2017-10-26",
    },
    {
      value: 114,
      day: "2015-05-03",
    },
    {
      value: 31,
      day: "2017-05-31",
    },
  ];

  const exampleData = [
    {
      id: "japan",
      color: "hsl(290, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 128,
        },
        {
          x: "helicopter",
          y: 123,
        },
        {
          x: "boat",
          y: 209,
        },
        {
          x: "train",
          y: 26,
        },
        {
          x: "subway",
          y: 262,
        },
        {
          x: "bus",
          y: 101,
        },
        {
          x: "car",
          y: 96,
        },
        {
          x: "moto",
          y: 44,
        },
        {
          x: "bicycle",
          y: 43,
        },
        {
          x: "horse",
          y: 240,
        },
        {
          x: "skateboard",
          y: 54,
        },
        {
          x: "others",
          y: 41,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(230, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 38,
        },
        {
          x: "helicopter",
          y: 59,
        },
        {
          x: "boat",
          y: 57,
        },
        {
          x: "train",
          y: 1,
        },
        {
          x: "subway",
          y: 9,
        },
        {
          x: "bus",
          y: 144,
        },
        {
          x: "car",
          y: 265,
        },
        {
          x: "moto",
          y: 226,
        },
        {
          x: "bicycle",
          y: 220,
        },
        {
          x: "horse",
          y: 47,
        },
        {
          x: "skateboard",
          y: 184,
        },
        {
          x: "others",
          y: 287,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(52, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 241,
        },
        {
          x: "helicopter",
          y: 288,
        },
        {
          x: "boat",
          y: 133,
        },
        {
          x: "train",
          y: 137,
        },
        {
          x: "subway",
          y: 208,
        },
        {
          x: "bus",
          y: 48,
        },
        {
          x: "car",
          y: 32,
        },
        {
          x: "moto",
          y: 76,
        },
        {
          x: "bicycle",
          y: 298,
        },
        {
          x: "horse",
          y: 290,
        },
        {
          x: "skateboard",
          y: 164,
        },
        {
          x: "others",
          y: 276,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(337, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 117,
        },
        {
          x: "helicopter",
          y: 88,
        },
        {
          x: "boat",
          y: 278,
        },
        {
          x: "train",
          y: 89,
        },
        {
          x: "subway",
          y: 10,
        },
        {
          x: "bus",
          y: 151,
        },
        {
          x: "car",
          y: 223,
        },
        {
          x: "moto",
          y: 284,
        },
        {
          x: "bicycle",
          y: 182,
        },
        {
          x: "horse",
          y: 133,
        },
        {
          x: "skateboard",
          y: 277,
        },
        {
          x: "others",
          y: 220,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(235, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 246,
        },
        {
          x: "helicopter",
          y: 223,
        },
        {
          x: "boat",
          y: 121,
        },
        {
          x: "train",
          y: 120,
        },
        {
          x: "subway",
          y: 35,
        },
        {
          x: "bus",
          y: 94,
        },
        {
          x: "car",
          y: 202,
        },
        {
          x: "moto",
          y: 93,
        },
        {
          x: "bicycle",
          y: 288,
        },
        {
          x: "horse",
          y: 139,
        },
        {
          x: "skateboard",
          y: 114,
        },
        {
          x: "others",
          y: 197,
        },
      ],
    },
  ];

  // State for the selected module (YARA Rules, Feature, Info)
  const [selectedModule, setSelectedModule] = useState("Info");

  useEffect(() => {
    // Fetch user data and handle state
    // Replace with your API calls
  }, []);

  const [yaraRules, setYaraRules] = useState([
    {
      name: "Win32_Backdoor_Minodo",
      description: "Yara rule that detects Minodo backdoor.",
      tags: ["backdoor", "minodo", "win32"],
      created: "2021-04-01",
      createdBy: "ReversingLabs",
      enabled: true,
    },
    {
      name: "Win32_Infostealer_MultigrainPOS",
      description: "Yara rule that detects MultigrainPOS infostealer.",
      tags: ["infostealer", "multigrainpos", "win32"],
      created: "2023-04-01",
      createdBy: "ReversingLabs",
      enabled: false,
    },
    // Add more YARA rules as needed
  ]);

  console.log(yaraRules);

  const headers = [
    { name: "Name", dataKey: "name" },
    { name: "Description", dataKey: "description" },
    {
      name: "Tags",
      cellRender: (item) => (
        <div className="flex flex-row items-center">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    { name: "Created", dataKey: "created" },
    { name: "Created By", dataKey: "createdBy" },
    {
      name: "Status",
      cellRender: (item) => (
        <button
          className={`flex items-center p-2 rounded text-white focus:outline-none`}
          onClick={() => toggleRuleStatus(item.name)}
        >
          {item.enabled ? (
            <FaToggleOn className="text-2xl text-green-600" />
          ) : (
            <FaToggleOff className="text-2xl text-red-600" />
          )}
        </button>
      ),
    },
  ];

  const toggleRuleStatus = (ruleName) => {
    // Implement logic to toggle the status of a specific YARA rule by its name
    setYaraRules((prevRules) =>
      prevRules.map((rule) =>
        rule.name === ruleName ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const addNewRule = () => {
    // Implement logic to add a new YARA rule
    // You can show a modal or navigate to a new page for rule creation
  };

  return (
    <div className="dark:text-white text-bodyTextWhite overflow-hidden">
      <div className="flex flex-row">
        {/* Sidebar */}
        <aside className="w-1/6 bg-blue-900 p-4 space-y-4 h-screen rounded-sm">
          <Link to="/">
            <h1 className="text-lg font-semibold text-white bg-blue-950 p-1 rounded-md flex flex-row items-center">
              <FaArrowLeft className="mr-2" />
              Home
            </h1>
          </Link>
          <h2 className="text-xl font-semibold mb-2 text-white">Navigation</h2>
          <ul className="text-white">
            <li className="mb-2">
              <button
                className={`w-full p-2 rounded-md text-left focus:outline-none flex items-center  ${
                  selectedModule === "Info" && "bg-blue-500"
                }`}
                onClick={() => setSelectedModule("Info")}
              >
                <FaInfo className="mr-2" />
                Info
              </button>
            </li>
            <span className="text-gray-400 select-none">Modules</span>
            <li className="mb-2">
              <button
                className={`w-full p-2 rounded-md text-left focus:outline-none flex items-center ${
                  selectedModule === "YARA Rules" && "bg-blue-500"
                }`}
                onClick={() => setSelectedModule("YARA Rules")}
              >
                <FaListAlt className="mr-2" />
                YARA Rules
              </button>
            </li>
            <li className="mb-2">
              <button
                className={`w-full p-2 rounded-md text-left focus:outline-none flex items-center ${
                  selectedModule === "Feature" && "bg-blue-500"
                }`}
                onClick={() => setSelectedModule("Feature")}
              >
                <FaCode className="mr-2" />
                Feature
              </button>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4 ml-1/5">
          {selectedModule === "Info" ? (
            <div className="flex items-center space-x-4 mb-4 flex-col">
              <FaUser className="text-4xl text-blue-500" />
              <h3 className="text-2xl font-semibold">User Information</h3>
              <div className="flex flex-col w-full dark:bg-surface p-2 rounded-md gap-2">
                <div className="flex flex-row">
                  <h1 className="w-1/12">Role: </h1>
                  <span className="w-2/12 text-red-600">Admin</span>
                </div>
                <div className="flex flex-row">
                  <h1 className="w-1/12">Name: </h1>
                  <span className="w-2/12">Lukas</span>
                </div>
                <div className="flex flex-row">
                  <h1 className="w-1/12">Email: </h1>
                  <span className="w-2/12">Lukas@gmail.com</span>
                </div>
              </div>

              {/* Statistics 3 cols */}
              <div className="mt-8 w-full h-96">
                <h1 className="text-center text-2xl mb-2">Statistics</h1>
                <div className="grid grid-cols-2 gap-4 w-full h-96">
                  <div className="bg-surface w-full h-full rounded-md">
                    <div className="w-full h-full">
                      <LineChart data={exampleData} />
                    </div>
                  </div>
                  <div className="bg-surface w-full h-full rounded-md">
                    <div className="w-full h-full">
                      <CalendarChart data={exampleCalendarData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedModule === "YARA Rules" ? (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">YARA Rules</h2>
              <p className="text-sm">
                Explore and manage your YARA rules for security and analysis.
              </p>
              <Table
                data={yaraRules}
                headers={headers}
                showSearchBar={true}
                showPagination={true}
              />
            </div>
          ) : (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Feature Title</h2>
              <p className="text-sm">
                Description of the feature and its functionality.
              </p>
            </div>
          )}

          {/* Include content for each module */}
        </main>
      </div>
    </div>
  );
}
