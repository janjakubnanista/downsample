import { DownsamplingMethod } from '../../types';
import { LTD, LTOB, LTTB } from '../../../../src';
import { Legend, Line, LineChart, LineProps, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { XYDataPoint } from '../../../../src/types';
import React from 'react';

const downsamplingMethodFromDataKey = (dataKey: string | undefined): DownsamplingMethod | undefined => {
  switch (dataKey) {
    case 'ltd':
      return DownsamplingMethod.LTD;

    case 'ltob':
      return DownsamplingMethod.LTOB;

    case 'lttb':
      return DownsamplingMethod.LTTB;

    default:
      return undefined;
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
  payload: LineProps;
}

export default class Chart extends React.PureComponent<ChartProps> {
  private onLegendItemClick = (item: LegendItem) => {
    const downsamplingMethod = downsamplingMethodFromDataKey(item.payload.id);
    if (!downsamplingMethod) {
      return;
    }

    const isDownsamplingMethodActive = this.props.activeDownsamplingMethods.includes(downsamplingMethod);
    const activeDownsamplingMethods = isDownsamplingMethodActive
      ? this.props.activeDownsamplingMethods.filter(
          (activeDownsamplingMethod) => activeDownsamplingMethod !== downsamplingMethod,
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
    const { activeDownsamplingMethods, data, numDownsampledDataPoints } = this.props;

    const isLTOBActive = activeDownsamplingMethods.includes(DownsamplingMethod.LTOB);
    const downsampledLTOB = isLTOBActive ? LTOB(data, numDownsampledDataPoints) : [];

    const isLTTBActive = activeDownsamplingMethods.includes(DownsamplingMethod.LTTB);
    const downsampledLTTB = isLTTBActive ? LTTB(data, numDownsampledDataPoints) : [];

    const isLTDActive = activeDownsamplingMethods.includes(DownsamplingMethod.LTD);
    const downsampledLTD = isLTDActive ? LTD(data, numDownsampledDataPoints) : [];

    return (
      <ResponsiveContainer height="75%">
        <LineChart margin={{ top: 20, right: 20, left: 20 }}>
          <XAxis dataKey="x" type="number" />
          <YAxis />
          <Legend onClick={this.onLegendItemClick} />
          <Tooltip />
          <Line
            dot={false}
            id="raw"
            type="linear"
            data={data}
            dataKey="y"
            stroke="#061766"
            isAnimationActive={false}
            connectNulls={true}
            name="Raw data"
          />
          <Line
            dot={false}
            id="ltob"
            type="linear"
            data={downsampledLTOB}
            dataKey="y"
            stroke={this.getColorForDownsamplingMethod(DownsamplingMethod.LTOB)}
            isAnimationActive={false}
            connectNulls={true}
            name="Downsampled with LTOB"
          />
          <Line
            dot={false}
            id="lttb"
            type="linear"
            data={downsampledLTTB}
            dataKey="y"
            stroke={this.getColorForDownsamplingMethod(DownsamplingMethod.LTTB)}
            isAnimationActive={false}
            connectNulls={true}
            name="Downsampled with LTTB"
          />
          <Line
            dot={false}
            id="ltd"
            type="linear"
            data={downsampledLTD}
            dataKey="y"
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
