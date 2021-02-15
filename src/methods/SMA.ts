import { DownsamplingFunction, Indexable, SmoothingFunctionConfig } from '../types';
import { createLegacyDataPointConfig, getPointValueExtractor, iterableBasedOn, mapToArray } from '../utils';

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
export const createSMA = <P>(
  config: SmoothingFunctionConfig<P>,
): DownsamplingFunction<P, [number, number | undefined] | [number]> => {
  const timeExtractor = getPointValueExtractor(config.x);
  const valueExtractor = getPointValueExtractor(config.y);
  const pointFactory = config.toPoint;

  return <Input extends Indexable<P> = Indexable<P>>(values: Input, windowSize: number, slide = 1): Input => {
    if (values.length === 0) return values;

    const data: number[] = mapToArray(values, valueExtractor);
    const times: number[] = mapToArray(values, timeExtractor);
    const output: Input = iterableBasedOn(values, 0);
    let sum = 0;
    let value: P;

    for (let i = 0; i < windowSize; i++) {
      sum += data[i];
    }

    for (let i = windowSize; i <= data.length; i++) {
      if ((i - windowSize) % slide === 0) {
        value = pointFactory((times[i - windowSize] + times[i - 1]) / 2, sum / windowSize, i - windowSize);
        output[output.length] = value;
      }

      sum += data[i] - data[i - windowSize];
    }

    return output;
  };
};

export const SMA = createSMA(createLegacyDataPointConfig());
