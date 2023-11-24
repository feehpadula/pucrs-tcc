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
  const data = props.itemData;

  const renderLastDot = (props: any) => {
    const { payload } = props;
    const lastData = data[data.length - 1];

    if (payload.date === lastData.date && payload.total === lastData.total) {
      return renderActiveDot(props);
    }
  };

  const renderActiveDot = (props: any) => {
    const { cx, cy, value, key } = props;

    return (
      <svg
        key={key}
        x={cx - 21}
        y={cy - 38}
        width="43"
        height="44"
        viewBox="0 0 43 44"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21 31 L30 24 H43 V0 H0 V24 H12 L21 31 Z" fill="#FFFFFF" />
        <text textAnchor="middle" dx={21.5} dy={18}>
          {value}
        </text>
        <rect
          x="17"
          y="34"
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
          padding={{ left: 30, right: 30 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis hide={true} padding={{ top: 45, bottom: 45 }} />
        <Tooltip cursor={{ stroke: "#FFFFFF", strokeWidth: 2 }} content={() => null} />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="total"
          dot={renderLastDot}
          activeDot={renderActiveDot}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
