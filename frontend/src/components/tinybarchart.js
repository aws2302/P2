import './css/App.css';
import React from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip } from 'recharts';

export default function TinyBar(props) {
  const data = [
    {
      Browser: 'Chrome',
      clicks: props.data.Browser.Chrome,
    },
    {
      Browser: 'Edge',
      clicks: props.data.Browser.Edge,
    },
    {
      Browser: 'Firefox',
      clicks: props.data.Browser.Firefox,
    },
    {
      Browser: 'Opera',
      clicks: props.data.Browser.Opera,
    },
    {
      Browser: 'Safari',
      clicks: props.data.Browser.Safari,
    },
    {
      Browser: 'Sonstige',
      clicks: props.data.Browser.Sonstige,
    },
  ];

  console.log(props);
  return (
    <BarChart width={500} height={250} data={data}>
      <Bar dataKey="clicks" fill="#DF3B04" />
      <XAxis dataKey={'Browser'} type="category" />
      <YAxis label={{ value: 'clicks', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
    </BarChart>
  );
}
