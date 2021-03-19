import React, { useState } from "react";
import { AreaChart, ResponsiveContainer, Area, YAxis } from "recharts";
import SimpleBar from "simplebar-react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import CardImage from "assets/Card.svg";
import { SizeMe } from "react-sizeme";
import ButtonBase from "@material-ui/core/ButtonBase";

const Button = ({ className = "", ...rest }) => {
  return (
    <ButtonBase
      {...rest}
      className={`block font-bold outline-none capitalize w-20 text-sm text-center h-7 rounded bg-blue-500 hover:bg-blue-501 active:bg-blue-502 transition cursor-pointer select-none ${className} `}
    ></ButtonBase>
  );
};

const generateData = (startDate, endDate) => {
  var data = [];

  var currDate = moment(startDate).startOf("day");
  var lastDate = moment(endDate).startOf("day");

  while (currDate.add(1, "days").diff(lastDate) < 0) {
    data.push({ date: currDate.clone().toDate(), value: Math.floor(Math.random() * 100) + 1 });
  }

  return data;
};

const filterDataByMode = (data, chartMode) => {
  switch (chartMode) {
    case "month":
      return data.filter((x, i) => i % 30 === 0).slice(-12);
    case "week":
      return data.slice(-7);
    case "all-time":
      return data.filter((x, i) => i % 120 === 0);
    default:
      return [];
  }
};

const Analytics = () => {
  const keys = [
    { title: "Kage AIO", keys: new Array(8).fill(0).map((x) => uuidv4()) },
    { title: "Koi", keys: new Array(2).fill(0).map((x) => uuidv4()) },
    { title: "Nebula", keys: new Array(7).fill(0).map((x) => uuidv4()) },
    { title: "Phoenix AIO", keys: new Array(4).fill(0).map((x) => uuidv4()) },
    { title: "TweetNinja", keys: new Array(1).fill(0).map((x) => uuidv4()) },
    { title: "Viper", keys: new Array(8).fill(0).map((x) => uuidv4()) },
    { title: "ZonosLabs", keys: new Array(8).fill(0).map((x) => uuidv4()) },
    { title: "ActiveCollab", keys: new Array(3).fill(0).map((x) => uuidv4()) },
  ];

  const [figures] = useState([
    {
      title: "Checkouts",
      values: generateData(moment().subtract(12, "months").toDate(), moment().toDate()),
    },
    {
      title: "Failed Checkouts",
      red: true,
      values: generateData(moment().subtract(12, "months").toDate(), moment().toDate()),
    },
    {
      title: "Tweets Caught",
      values: generateData(moment().subtract(12, "months").toDate(), moment().toDate()),
    },
    {
      title: "Servers Joined",
      values: generateData(moment().subtract(12, "months").toDate(), moment().toDate()),
    },
  ]);

  const [cartToShowIndex, setCartToShowIndex] = useState(0);
  const [chartMode, setChartMode] = useState("week");

  const modes = ["week", "month", "all-time"];

  const dataFlteredByMode = filterDataByMode(figures[cartToShowIndex].values, chartMode);

  return (
    <div className="w-full h-full flex flex-col text-white font-bold">
      <div className="text-center mb-3 font-bold">Analytics</div>
      <SizeMe monitorHeight>
        {({ size }) => (
          <SimpleBar className="flex-grow h-0 px-5">
            <div style={{ height: size.height }} className="flex flex-col">
              <div className="flex flex-wrap overflow-hidden flex-shrink-0">
                <div className="sm:w-1/3 md:w-full lg:w-1/3 w-full">
                  <div className="mb-2 h-7">Key Vault</div>
                  <SimpleBar className="bg-blue-900 p-4 rounded sm:mr-5 md:mr-0 lg:mr-5 h-80">
                    {keys.map((x, i) => (
                      <div key={x.title} className="flex flex-wrap items-center mb-6">
                        <div className="mr-2">{x.title}:</div>
                        <div className="text-green mr-2">{`${x.keys.length} Keys`}</div>
                        <ButtonBase className="font-bold transition text-xs outline-none bg-blue-500 hover:bg-blue-501 rounded-xl px-3 py-0.5 cursor-pointer">
                          View All Keys
                        </ButtonBase>
                      </div>
                    ))}
                  </SimpleBar>
                  <div className="pt-4 mb-5">
                    <Button>Export</Button>
                  </div>
                </div>
                <div className="sm:w-2/3 md:w-full lg:w-2/3 w-full">
                  <div className="mb-2 flex justify-between">
                    <div>
                      Graph (
                      <span
                        className={figures[cartToShowIndex].red ? "text-red-500" : "text-green"}
                      >
                        {figures[cartToShowIndex].title}
                      </span>
                      )
                    </div>
                    <div className="flex">
                      {modes.map((x) => (
                        <Button
                          className="font-bold ml-3 mb-0"
                          key={`mode-${x}`}
                          onClick={() => setChartMode(x)}
                        >
                          {x}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="h-80 relative bg-blue-900 rounded pt-2 flex flex-col mb-1 overflow-hidden">
                    <ResponsiveContainer width="100%">
                      <AreaChart
                        data={dataFlteredByMode}
                        margin={{ top: 0, right: 0, left: -30, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4fff9e" />
                            <stop offset="95%" stopColor="#524eee" />
                          </linearGradient>
                        </defs>
                        <Area
                          type="basis"
                          dataKey="value"
                          stroke="none"
                          fillOpacity={1}
                          fill="url(#colorUv)"
                        />
                        <YAxis
                          textAnchor="start"
                          interval="preserveStartEnd"
                          tickMargin={-14}
                          width={30}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "white" }}
                        ></YAxis>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between mb-5">
                    {dataFlteredByMode.map((x, i) => (
                      <div key={`tick-${i}`}>
                        {chartMode === "week"
                          ? moment(x.date).format("ddd")
                          : chartMode === "month"
                          ? moment(x.date).format("MMM")
                          : moment(x.date).format("YYYY-MM")}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-end justify-center pb-3">
                {figures.map((x, i) => (
                  <div key={`figure-${i}`}>
                    {i === 0 ? (
                      <div className="mb-3 whitespace-nowrap w-56">
                        Click Any Card For Analytics
                      </div>
                    ) : null}
                    <div
                      onClick={() => setCartToShowIndex(i)}
                      className="transition select-none cursor-pointer rounded-xl flex-none mb-4 mr-4 bg-cover bg-center w-56 bg-opacity-50 p-3 relative"
                      style={{ backgroundImage: `url(${CardImage})` }}
                    >
                      <div className="pt-7 text-xl mb-1 text-center">{x.title}</div>
                      <div
                        className={`${
                          x.title === "Failed Checkouts" ? "text-red-500" : "text-green"
                        } text-4xl text-center`}
                      >
                        {x.values[x.values.length - 1].value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SimpleBar>
        )}
      </SizeMe>
    </div>
  );
};

export default Analytics;
