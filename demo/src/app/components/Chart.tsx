import { DownsamplingMethod } from '../../types';
import { LTD, LTOB, LTTB } from '../../../../src';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { XYDataPoint } from '../../../../src/types';
import React from 'react';

const downsamplingMethodFromDataKey = (dataKey: string): DownsamplingMethod => {
  switch (dataKey) {
    case 'ltd':
      return DownsamplingMethod.LTD;

    case 'ltob':
      return DownsamplingMethod.LTOB;

    case 'lttb':
      return DownsamplingMethod.LTTB;

    default:
      throw new Error('Unknown method: ' + dataKey);
  }
};

export interface ChartProps {
  activeDownsamplingMethods: DownsamplingMethod[];
  data: XYDataPoint[];
  numDownsampledDataPoints: number;
  onActiveDownsamplingMethodsChange: (activeDownsamplingMethods: DownsamplingMethod[]) => void;
}

interface LegendItem {
  dataKey: string;
}

interface MergedDataPoint extends XYDataPoint {
  ltd: number;
  ltob: number;
  lttb: number;
}

export default class Chart extends React.PureComponent<ChartProps> {
  getData(): MergedDataPoint[] {
    const { activeDownsamplingMethods } = this.props;

    const isLTOBActive = activeDownsamplingMethods.includes(DownsamplingMethod.LTOB);
    const downsampledLTOB = isLTOBActive ? LTOB(this.props.data, this.props.numDownsampledDataPoints) : [];

    const isLTTBActive = activeDownsamplingMethods.includes(DownsamplingMethod.LTTB);
    const downsampledLTTB = isLTTBActive ? LTTB(this.props.data, this.props.numDownsampledDataPoints) : [];

    const isLTDActive = activeDownsamplingMethods.includes(DownsamplingMethod.LTD);
    const downsampledLTD = isLTDActive ? LTD(this.props.data, this.props.numDownsampledDataPoints) : [];

    return this.props.data.map<MergedDataPoint>((dataPoint: XYDataPoint) => {
      const dataPointLTOB = downsampledLTOB.find(({ x }: XYDataPoint) => x === dataPoint.x);
      const dataPointLTTB = downsampledLTTB.find(({ x }: XYDataPoint) => x === dataPoint.x);
      const dataPointLTD = downsampledLTD.find(({ x }: XYDataPoint) => x === dataPoint.x);

      return {
        ...dataPoint,
        ltd: dataPointLTD ? dataPointLTD.y : undefined,
        ltob: dataPointLTOB ? dataPointLTOB.y : undefined,
        lttb: dataPointLTTB ? dataPointLTTB.y : undefined,
      };
    });
  }

  private onLegendItemClick = (item: LegendItem) => {
    const downsamplingMethod: DownsamplingMethod = downsamplingMethodFromDataKey(item.dataKey);
    if (!downsamplingMethod) {
      return;
    }

    const isDownsamplingMethodActive = this.props.activeDownsamplingMethods.includes(downsamplingMethod);
    const activeDownsamplingMethods = isDownsamplingMethodActive
      ? this.props.activeDownsamplingMethods.filter(
          activeDownsamplingMethod => activeDownsamplingMethod !== downsamplingMethod,
        )
      : [...this.props.activeDownsamplingMethods, downsamplingMethod];

    this.props.onActiveDownsamplingMethodsChange(activeDownsamplingMethods);
  };

  private getColorForDownsamplingMethod(downsamplingMethod: DownsamplingMethod): string {
    if (!this.props.activeDownsamplingMethods.includes(downsamplingMethod)) {
      return '#CCCCCC';
    }

    switch (downsamplingMethod) {
      case DownsamplingMethod.LTD:
        return '#FF9C00';

      case DownsamplingMethod.LTOB:
        return '#C20165';

      case DownsamplingMethod.LTTB:
        return '#00B7D9';
    }
  }

  render(): React.ReactNode {
    const data = this.getData();

    return (
      <ResponsiveContainer height="75%">
        <LineChart data={data} margin={{ top: 20, right: 20, left: 20 }}>
          <XAxis dataKey="x" />
          <YAxis />
          <Legend onClick={this.onLegendItemClick} />
          <Tooltip />
          <Line dot={false} type="linear" dataKey="y" stroke="#061766" isAnimationActive={false} name="Raw data" />
          <Line
            dot={false}
            type="linear"
            dataKey="ltob"
            stroke={this.getColorForDownsamplingMethod(DownsamplingMethod.LTOB)}
            isAnimationActive={false}
            connectNulls={true}
            name="Downsampled with LTOB"
          />
          <Line
            dot={false}
            type="linear"
            dataKey="lttb"
            stroke={this.getColorForDownsamplingMethod(DownsamplingMethod.LTTB)}
            isAnimationActive={false}
            connectNulls={true}
            name="Downsampled with LTTB"
          />
          <Line
            dot={false}
            type="linear"
            dataKey="ltd"
            stroke={this.getColorForDownsamplingMethod(DownsamplingMethod.LTD)}
            isAnimationActive={false}
            connectNulls={true}
            name="Downsampled with LTD"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
