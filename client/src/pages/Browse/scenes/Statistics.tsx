import { useEffect, useState } from "react";
import { getStatistics } from "../../../service/api-service";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";

interface IStatistics {
  totalThreats: number;
  totalSafe: number;
  totalEmails: number;
  pieChartData: {
    id: string;
    label: string;
    value: number;
    color: string;
  }[];
  lineChartData: {
    id: string;
    color: string;
    data: {
      x: string;
      y: number;
    }[];
  }[];
}

const PieComponent = ({ data }: { data: IStatistics }) => (
  <ResponsivePie
    data={data?.pieChartData}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    tooltip={({ datum }) => (
      <div className="dark:text-white rounded-sm shadow-sm dark:bg-gray-800 p-2 text-base">
        <strong>{datum.label}</strong>
        <div>{datum.value}</div>
      </div>
    )}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    colors={["#dc2626", "#16a34a"]}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#fff",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#fff",
            },
          },
        ],
      },
    ]}
  />
);

const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.toLocaleDateString()}`;
};

const LineComponent = ({ data /* see data tab */ }: { data: IStatistics }) => (
  <ResponsiveLine
    data={data.lineChartData}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    tooltip={({ point }) => (
      <div className="dark:text-white rounded-sm shadow-sm dark:bg-gray-800 p-2 text-base">
        <strong>
          {point.id} ({point.data.y})
        </strong>
        <p>{formatDate(point.data.x)}</p>
      </div>
    )}
    colors={["#dc2626", "#16a34a"]}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
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
        itemTextColor: "#fff",
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

const Statistics = () => {
  const [data, setData] = useState<IStatistics>();

  useEffect(() => {
    getStatistics().then((data: IStatistics) => {
      console.log(data);
      setData(data);
    });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-row justify-evenly items-center space-x-6 dark:text-white text-bodyTextWhite w-full">
          <div className="flex flex-col items-center p-4 rounded-lg">
            <h6 className="text-lg font-semibold">Total</h6>
            <p className="text-3xl font-bold text-primary">
              {data?.totalEmails}
            </p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg">
            <h6 className="text-lg font-semibold">Total Threats</h6>
            <p className="text-3xl font-bold text-threat">
              {data?.totalThreats}
            </p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg">
            <h6 className="text-lg font-semibold">Total Safe</h6>
            <p className="text-3xl font-bold text-safe">{data?.totalSafe}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-evenly gap-4 dark:text-white text-bodyTextWhite">
        <div className="flex flex-col items-center bg-surface-light dark:bg-surface shadow-md border dark:border-gray-700 border-gray-300 p-4 rounded-lg w-3/12">
          <h5 className="text-lg font-semibold">Last Scanned Emails</h5>
          <div className="w-72 h-60">
            <PieComponent data={data} />
          </div>
        </div>

        {/* Line with statistics */}
        <div className="flex flex-col items-center bg-surface-light dark:bg-surface shadow-md p-4 border dark:border-gray-700 border-gray-300 rounded-lg w-7/12">
          <h5 className="text-lg font-semibold mb-4">
            Last 3 Days Scanned Emails
          </h5>
          <div className="w-full h-60">
            {" "}
            {/* Increased width */}
            <LineComponent data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
