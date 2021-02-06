import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import dataQuarter from './dataQuarter';

const StackedBarChart = () => (

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={dataQuarter}
              margin={{top: 10, right: 0, left: -25, bottom: 0}}>
      <XAxis dataKey="name"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend/>
      <Bar dataKey="Présent" stackId="a" fill="#3367d6"/>
      <Bar dataKey="Absent" stackId="a" fill="#ffc658"/>
      <Bar dataKey="Retard" stackId="a" fill="#336755"/>
    </BarChart>
  </ResponsiveContainer>
);

export default StackedBarChart;