import "./css/App.css";
import React from "react";
import { BarChart, Bar } from "recharts";

const data = [
  {
    name: "Chrome",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Edge",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Firefox",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Opera",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Safari",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Sonstige",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
];

export default function TinyBar() {
  return (
    <BarChart width={150} height={40} data={data}>
      <Bar dataKey="uv" fill="#8884d8" />
    </BarChart>
  );
}
