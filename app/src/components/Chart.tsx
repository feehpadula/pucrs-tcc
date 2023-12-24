import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./Chart.scss";

const Chart = (props) => {
  const item = props.item;
  const data = props.itemData;

  const renderActiveDot = (props: any) => {
    const { cx, cy, key } = props;

    return (
      <svg
        key={key}
        x={cx - 5}
        y={cy - 5}
        width="10"
        height="10"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="8"
          height="8"
          rx="4"
          fill="#222222"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{}}>
        <CartesianGrid horizontal={false} fill="#D9D9D9" stroke="#FFFFFF" />
        <XAxis
          dataKey="date"
          padding={{ left: 45, right: 45 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          hide={true}
          padding={{ top: 45, bottom: 45 }}
          domain={["dataMin", "dataMax"]}
          allowDataOverflow={false}
        />
        <Tooltip
          cursor={{ stroke: "#FFFFFF", strokeWidth: 2 }}
          separator={item.dataPresentation === 2 ? "" : ": "}
          formatter={(value) => (item.dataPresentation !== 0 ? `${value}%` : value)}
          animationDuration={300}
        />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey={item.dataPresentation === 2 ? "combined" : "field01data"}
          name={item.dataPresentation === 2 ? " " : item.field01name}
          //dot={renderLastDot}
          activeDot={renderActiveDot}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
