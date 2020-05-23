import { Legend, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import React from 'react';

export interface ChartProps {
  children?: React.ReactNode;
}

export const Chart: React.FC<ChartProps> = ({ children }) => {
  return (
    <ResponsiveContainer height={320}>
      <LineChart margin={{ top: 20, right: 20, left: 20 }}>
        <XAxis dataKey="x" type="number" domain={['dataMin', 'dataMax']} />
        <YAxis />
        <Legend />
        {children}
      </LineChart>
    </ResponsiveContainer>
  );
};
