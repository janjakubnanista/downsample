import { DownsamplingFunction, SmoothingFunctionConfig } from '../types';
import { createLegacyDataPointConfig, getPointValueExtractor } from '../utils';

export const SMANumeric = (data: number[], windowSize: number, slide = 1): number[] => {
  const output: number[] = [];
  let sum = 0;

  for (let i = 0; i < windowSize; i++) {
    sum += data[i];
  }

  for (let i = windowSize; i <= data.length; i++) {
    if ((i - windowSize) % slide === 0) {
      output.push(sum / windowSize);
    }

    sum += data[i] - data[i - windowSize];
  }

  return output;
};

/**
 * Simple Moving Average (SMA)
 *
 * @param data {Number[]}
 * @param windowSize {Number}
 * @param slide {Number}
 */
export const createSMA = <T>(
  config: SmoothingFunctionConfig<T>,
): DownsamplingFunction<T, [number, number | undefined] | [number]> => {
  const timeExtractor = getPointValueExtractor(config.x);
  const valueExtractor = getPointValueExtractor(config.y);
  const pointFactory = config.toPoint;

  return (values, windowSize, slide = 1): T[] => {
    if (values.length === 0) return [];
    // if (windowSize === 1 && slide === 1) return values.slice();

    const data: number[] = values.map(valueExtractor);
    const times: number[] = values.map(timeExtractor);
    const output: T[] = [];
    let sum = 0;

    for (let i = 0; i < windowSize; i++) {
      sum += data[i];
    }

    for (let i = windowSize; i <= data.length; i++) {
      if ((i - windowSize) % slide === 0) {
        output.push(pointFactory((times[i - windowSize] + times[i - 1]) / 2, sum / windowSize, i - windowSize));
      }

      sum += data[i] - data[i - windowSize];
    }

    return output;
  };
};

export const SMA = createSMA(createLegacyDataPointConfig());
