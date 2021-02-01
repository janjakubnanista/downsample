import {
  ArrayLike,
  DataPoint,
  NormalizedDataPoint,
  NumericPropertyAccessor,
  PointValueExtractor,
  SmoothingFunctionConfig,
  TypedArray,
  XYDataPoint,
} from './types';
import { isA } from 'ts-type-checked';

export function calculateTriangleArea(
  pointA: NormalizedDataPoint,
  pointB: NormalizedDataPoint,
  pointC: NormalizedDataPoint,
): number {
  return (
    Math.abs((pointA[0] - pointC[0]) * (pointB[1] - pointA[1]) - (pointA[0] - pointB[0]) * (pointC[1] - pointA[1])) / 2
  );
}

export function calculateAverageDataPoint(...points: NormalizedDataPoint[]): NormalizedDataPoint | undefined {
  const { length } = points;
  if (!length) return undefined;

  let averageX = 0;
  let averageY = 0;
  for (let i = 0; i < length; i++) {
    averageX += points[i][0];
    averageY += points[i][1];
  }

  return [averageX / length, averageY / length];
}

export function splitIntoBuckets<T>(data: T[], desiredLength: number): T[][] {
  if (data.length === 2) {
    return [[data[0]], [data[1]]];
  }

  const first: T = data[0];
  const center: T[] = data.slice(1, data.length - 1);
  const last: T = data[data.length - 1];

  // First and last bucket are formed by the first and the last data points
  // so we only have N - 2 buckets left to fill
  const bucketSize: number = center.length / (desiredLength - 2);
  const splitData: T[][] = [[first]];

  for (let i = 0; i < desiredLength - 2; i++) {
    const bucketStartIndex: number = Math.floor(i * bucketSize);
    const bucketEndIndex: number = Math.floor((i + 1) * bucketSize);
    const dataPointsInBucket: T[] = center.slice(bucketStartIndex, bucketEndIndex);

    splitData.push(dataPointsInBucket);
  }

  splitData.push([last]);

  return splitData;
}

export const calculateMean = (values: number[]): number => {
  let m = 0;
  for (let i = 0; i < values.length; i += 1) {
    m += values[i];
  }

  return m / values.length;
};

export const calculateSTD = (values: number[]): number => {
  const mean = calculateMean(values);

  let std = 0;
  for (let i = 0; i < values.length; i += 1) {
    std += (values[i] - mean) * (values[i] - mean);
  }

  return Math.sqrt(std / values.length);
};

export const getPointValueExtractor = <P>(
  accessor: NumericPropertyAccessor<P> | PointValueExtractor<P>,
): PointValueExtractor<P> => {
  if (isA<PointValueExtractor<unknown>>(accessor)) return accessor;

  return (point: P) => (point as any)[accessor];
};

export const createNormalize = <P>(
  x: NumericPropertyAccessor<P> | PointValueExtractor<P>,
  y: NumericPropertyAccessor<P> | PointValueExtractor<P>,
) => {
  const getX = getPointValueExtractor(x);
  const getY = getPointValueExtractor(y);

  return (data: ArrayLike<P> | TypedArray): NormalizedDataPoint[] => data.map((point: P, index: number) => [getX(point, index), getY(point, index)]);
};

export const createXYDataPoint = (time: number, value: number): XYDataPoint => ({ x: time, y: value });

export const createLegacyDataPointConfig = (): SmoothingFunctionConfig<DataPoint> => ({
  x: (point: DataPoint) => {
    const t = isA<XYDataPoint>(point) ? point.x : point[0];

    return isA<Date>(t) ? t.getTime() : t;
  },
  y: (point: DataPoint) => ('y' in point ? point.y : point[1]),
  toPoint: createXYDataPoint,
});

export const emptyArray = <T extends ArrayLike<unknown> = ArrayLike<unknown>>(originalArray: T): T => {
  if (typeof originalArray.constructor !== 'function')
    throw new Error(`Cannot create an empty array based on '${originalArray}': constructor property is not callable`);

  return new (originalArray.constructor as any)();
};

export const arrayAs = <E, T extends ArrayLike<E> = ArrayLike<E>>(data: Array<E>, template: T): T => {
  if (template.constructor === data.constructor) return (data as unknown) as T;
  if (typeof template.constructor !== 'function')
    throw new Error(`Cannot create an array based on '${template}': constructor property is not callable`);

  return new (template.constructor as any)(data);
};
