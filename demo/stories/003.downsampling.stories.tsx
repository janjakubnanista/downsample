import { ASAP, LTD, LTOB, LTTB, SMA } from '../../src';
import { Banner } from './components/typography';
import { Chart } from './components/Chart';
import { ChartLine } from './components/ChartLine';
import { DataType, dataFactories } from './data';
import { boolean, number, select } from '@storybook/addon-knobs';
import { generateRandomData } from './utils';
import React, { useMemo } from 'react';

const getSlider = (title: string, min: number, max: number, defaultValue: number, step = 1, groupId?: string): number =>
  number(
    title,
    defaultValue,
    {
      range: true,
      min,
      max,
      step,
    },
    groupId,
  ) || 0;

const getControls = () => ({
  numRawDataPoints: getSlider('Number of original data points', 100, 10000, 1000, 100, 'General'),
  numDownsampledDataPoints: getSlider('Number of downsampled data points', 10, 1000, 10, 1, 'General'),
  smaWindowSize: getSlider('Window size', 1, 1000, 100, 1, 'SMA Specific'),
  smaSlide: getSlider('Slide', 1, 1000, 1, 1, 'SMA Specific'),
  showOriginal: boolean('Show Original', true, 'General'),
  showLTD: boolean('Show LTD', true, 'General'),
  showLTOB: boolean('Show LTOB', true, 'General'),
  showLTTB: boolean('Show LTTB', true, 'General'),
  showASAP: boolean('Show ASAP', true, 'General'),
  showSMA: boolean('Show SMA', true, 'General'),
});

export default {
  title: 'Comparison',
};

export const WithRandomData = () => {
  const evenlyDistributed = boolean('Evenly distributed data', true, 'General');
  const {
    numRawDataPoints,
    numDownsampledDataPoints,
    smaWindowSize,
    smaSlide,
    showOriginal,
    showLTOB,
    showLTTB,
    showLTD,
    showASAP,
    showSMA,
  } = getControls();

  const data = useMemo(() => generateRandomData(numRawDataPoints, evenlyDistributed), [
    numRawDataPoints,
    evenlyDistributed,
  ]);
  const downsampledLTOB = showLTOB ? LTOB(data, numDownsampledDataPoints) : [];
  const downsampledLTTB = showLTTB ? LTTB(data, numDownsampledDataPoints) : [];
  const downsampledLTD = showLTD ? LTD(data, numDownsampledDataPoints) : [];
  const downsampledASAP = showASAP ? ASAP(data, numDownsampledDataPoints) : [];
  const downsampledSMA = showSMA ? SMA(data, smaWindowSize, smaSlide) : [];

  return (
    <>
      <h1>Random data</h1>

      <p>The chart below allows you to compare results of applying downsampling to randomly generated data.</p>

      <Banner>
        Use the storybook knobs below to play around with the data &amp; parameters.{' '}
        <strong>ASAP and SMA will only work well with evenly distributed data!</strong>
      </Banner>

      <Chart>
        {showOriginal ? ChartLine({ data: data, dataKey: 'y', color: '#061766', title: 'Original data' }) : null}
        {showLTD ? ChartLine({ data: downsampledLTD, dataKey: 'y', color: '#FF9C00', title: 'LTD' }) : null}
        {showLTOB ? ChartLine({ data: downsampledLTOB, dataKey: 'y', color: '#e96900', title: 'LTOB' }) : null}
        {showLTTB ? ChartLine({ data: downsampledLTTB, dataKey: 'y', color: '#00B7D9', title: 'LTTB' }) : null}
        {showASAP ? ChartLine({ data: downsampledASAP, dataKey: 'y', color: '#FF385C', title: 'ASAP' }) : null}
        {showSMA ? ChartLine({ data: downsampledSMA, dataKey: 'y', color: '#04BF8A', title: 'SMA' }) : null}
      </Chart>
    </>
  );
};

WithRandomData.story = {
  name: 'With Random Data',
};

export const WithPeriodicData = () => {
  const dataType = select<DataType>(
    'Data type',
    {
      Power: 'power',
      Taxi: 'taxi',
      Temperature: 'temperature',
    },
    'taxi',
    'General',
  );
  const dataFactory = dataFactories[dataType];
  const {
    numRawDataPoints,
    numDownsampledDataPoints,
    smaWindowSize,
    smaSlide,
    showOriginal,
    showLTOB,
    showLTTB,
    showLTD,
    showASAP,
    showSMA,
  } = getControls();

  const data = useMemo(() => dataFactory().slice(0, numRawDataPoints), [numRawDataPoints, dataFactory]);
  const downsampledLTOB = showLTOB ? LTOB(data, numDownsampledDataPoints) : [];
  const downsampledLTTB = showLTTB ? LTTB(data, numDownsampledDataPoints) : [];
  const downsampledLTD = showLTD ? LTD(data, numDownsampledDataPoints) : [];
  const downsampledASAP = showASAP ? ASAP(data, numDownsampledDataPoints) : [];
  const downsampledSMA = showSMA ? SMA(data, smaWindowSize, smaSlide) : [];

  return (
    <>
      <h1>Periodic data</h1>

      <p></p>

      <Banner>Use the storybook knobs below to play around with the data &amp; parameters</Banner>

      <Chart>
        {showOriginal ? ChartLine({ data: data, dataKey: 'y', color: '#061766', title: 'Original data' }) : null}
        {showLTD ? ChartLine({ data: downsampledLTD, dataKey: 'y', color: '#FF9C00', title: 'LTD' }) : null}
        {showLTOB ? ChartLine({ data: downsampledLTOB, dataKey: 'y', color: '#e96900', title: 'LTOB' }) : null}
        {showLTTB ? ChartLine({ data: downsampledLTTB, dataKey: 'y', color: '#00B7D9', title: 'LTTB' }) : null}
        {showASAP ? ChartLine({ data: downsampledASAP, dataKey: 'y', color: '#FF385C', title: 'ASAP' }) : null}
        {showSMA ? ChartLine({ data: downsampledSMA, dataKey: 'y', color: '#04BF8A', title: 'SMA' }) : null}
      </Chart>
    </>
  );
};

WithPeriodicData.story = {
  name: 'With Periodic Data',
};
