import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export function Chart(props) {
  return (
    <BarChart width={500} height={300} data={props.data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="words" fill="#01A299" />
    </BarChart>
  );
}
