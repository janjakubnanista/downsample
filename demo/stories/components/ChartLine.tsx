import { Line } from 'recharts';
import React from 'react';

export interface ChartLineProps {
  color: string;
  data?: object[]; // eslint-disable-line
  dataKey: string;
  title: string;
}

export const ChartLine: React.FC<ChartLineProps> = ({ color, data, dataKey, title }) => {
  return (
    <Line
      dot={false}
      type="linear"
      data={data}
      dataKey={dataKey}
      stroke={color}
      isAnimationActive={false}
      connectNulls={true}
      name={title}
    />
  );
};
