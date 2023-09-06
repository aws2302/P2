import "./css/App.css";
import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ScatterChart,
  LineChart,
  PieChart,
  Pie,
  PolarAngleAxis,
  Radar,
  RadarChart,
  PolarGrid,
  PolarRadiusAxis,
} from "recharts";

export default function TinyBar(props) {
const data = [
  {
    Browser: "Chrome",
    clicks: 500,
  },
  {
    Browser: "Edge",
    clicks: props.data.Browser.Edge,
  },
  {
    Browser: "Firefox",
    clicks: 200,
  },
  {
    Browser: "Opera",
    clicks: 150,
  },
  {
    Browser: "Safari",
    clicks: 300,
  },
  {
    Browser: "Sonstige",
    clicks: 400,
  },
];


  console.log(props)
  return (
    <BarChart 
    width={500}
    height={250} 
    data={data}
    >
      <Bar dataKey="clicks" fill="#DF3B04" />
      <XAxis dataKey={"Browser"} type="category" />
      <YAxis label={{ value: "clicks", angle: -90, position: "insideLeft" }} />
      <Tooltip />
    </BarChart>
  );
}
