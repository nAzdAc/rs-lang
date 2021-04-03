import React from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { data } from '../const/everyDayChart';

export function Chart() {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="words" fill="#01A299" />
    </BarChart>
  );
}
