import { DownsamplingFunction, ArrayLike, SmoothingFunctionConfig, ArrayType } from '../types';
import { arrayAs, createLegacyDataPointConfig, emptyArray, getPointValueExtractor } from '../utils';

export const SMANumeric = <T extends ArrayLike<number>>(data: T, windowSize: number, slide = 1): T => {
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

  return arrayAs(output, data);
};

/**
 * Simple Moving Average (SMA)
 *
 * @param data {Number[]}
 * @param windowSize {Number}
 * @param slide {Number}
 */
export const createSMA = <InputDataPoint, InputArray extends ArrayType<InputDataPoint> = ArrayLike<InputDataPoint>>(
  config: SmoothingFunctionConfig<InputDataPoint>,
): DownsamplingFunction<InputDataPoint, [number, number | undefined] | [number], InputArray> => {
  const timeExtractor = getPointValueExtractor(config.x);
  const valueExtractor = getPointValueExtractor(config.y);
  const pointFactory = config.toPoint;

  return (values, windowSize, slide = 1): InputArray => {
    if (values.length === 0) return values;
    // if (windowSize === 1 && slide === 1) return values.slice();

    const data: ArrayLike<number> = values.map(valueExtractor);
    const times: ArrayLike<number> = values.map(timeExtractor);
    const output: InputDataPoint[] = [];
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

    return arrayAs(data, values);
  };
};

export const SMA = createSMA(createLegacyDataPointConfig());
