import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { XYDataPoint } from "../../../../src/types";
import { LTOB, LTTB } from "../../../../src";

export interface ChartProps {
  data: XYDataPoint[];
  numDownsampledDataPoints: number;
}

interface MergedDataPoint extends XYDataPoint {
  ltob: number;
  lttb: number;
}

export default class Chart extends React.PureComponent<ChartProps> {
  getData(): MergedDataPoint[] {
    const downsampledLTOB = LTOB(this.props.data, this.props.numDownsampledDataPoints);
    const downsampledLTTB = LTTB(this.props.data, this.props.numDownsampledDataPoints);

    return this.props.data.map<MergedDataPoint>((dataPoint: XYDataPoint) => {
      const dataPointLTOB = downsampledLTOB.find(({ x }: XYDataPoint) => x === dataPoint.x);
      const dataPointLTTB = downsampledLTTB.find(({ x }: XYDataPoint) => x === dataPoint.x);

      return {
        ...dataPoint,
        ltob: dataPointLTOB ? dataPointLTOB.y : undefined,
        lttb: dataPointLTTB ? dataPointLTTB.y : undefined,
      }
    });
  }

  render(): React.ReactNode {
    const data = this.getData();

    return <ResponsiveContainer height="75%">
      <LineChart data={data} margin={{ top: 20, right: 20, left: 20 }}>
        <XAxis dataKey="x" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Line dot={false} type="linear" dataKey="y" stroke="#FEDF03" isAnimationActive={false} name="Raw data"/>
        <Line dot={false} type="linear" dataKey="ltob" stroke="#0085B6" isAnimationActive={false} connectNulls={true} name="Downsampled with LTOB"/>
        <Line dot={false} type="linear" dataKey="lttb" stroke="#00D49D" isAnimationActive={false} connectNulls={true} name="Downsampled with LTTB"/>
      </LineChart>
    </ResponsiveContainer>;
  }
}