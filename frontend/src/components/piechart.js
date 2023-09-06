import './css/App.css';
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

let renderLabel = function (entry) {
  return entry.os;
};

const COLORS = ['#0467DF', '#DF3B04', '#DF8F04', '#FF8042'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return React.createElement(
    'text',
    {
      x: x,
      y: y,
      fill: 'white',
      textAnchor: x > cx ? 'start' : 'end',
      dominantBaseline: 'central',
    },
    `${(percent * 100).toFixed(0)}%`
  );
};
export default function Chartpie(props) {
  const data = [
    // Muss noch bearbeitet werden damit daten von DB kommen
    { os: 'Windows', used: props.data.OS.Windows },
    { os: 'MacOS', used: props.data.OS.MacOs },
    { os: 'Linux', used: props.data.OS.Linux },
  ];
  return React.createElement(
    PieChart,
    { width: 400, height: 400 },
    React.createElement(
      Pie,
      {
        data: data,
        cx: 200,
        cy: 200,
        labelLine: true,
        label: renderLabel,
        outerRadius: 80,
        fill: '#8884d8',
        dataKey: 'used',
      },
      data.map((entry, index) =>
        React.createElement(Cell, {
          key: `cell-${index}`,
          fill: COLORS[index % COLORS.length],
        })
      )
    )
  );
}
