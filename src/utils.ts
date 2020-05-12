import { DataPoint, NormalizedDataPoint, TupleDataPoint, X, XYDataPoint } from './types';

const isTupleDataPoint = (dataPoint: DataPoint): dataPoint is TupleDataPoint => {
  return Array.isArray(dataPoint);
};

const isXYDataPoint = (dataPoint: DataPoint): dataPoint is XYDataPoint => {
  return !!dataPoint && 'x' in dataPoint && 'y' in dataPoint;
};

const normalizeX = (x: X): number => (x instanceof Date ? x.getTime() : x);

export function normalizeDataPoint(dataPoint: DataPoint): NormalizedDataPoint | undefined {
  if (!dataPoint) return undefined;

  if (isXYDataPoint(dataPoint)) {
    return [normalizeX(dataPoint.x), dataPoint.y];
  }

  if (isTupleDataPoint(dataPoint)) {
    return [normalizeX(dataPoint[0]), dataPoint[1]];
  }

  throw new Error(`Invalid data point format supplied: ${JSON.stringify(dataPoint)}`);
}

export function normalizeDataPoints(dataPoints: DataPoint[]): NormalizedDataPoint[] {
  return dataPoints.map(normalizeDataPoint).filter(Boolean) as NormalizedDataPoint[];
}

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

// Simple moving average
export const calculateSMA = (data: number[], range: number, slide: number) => {
  let windowStart = 0;
  let sum = 0;
  let count = 0;
  const values = [];

  for (let i = 0; i < data.length; i++) {
    if (isNaN(data[i])) {
      data[i] = 0;
    }
    if (i - windowStart >= range) {
      values.push(sum / count);
      const oldStart = windowStart;
      while (windowStart < data.length && windowStart - oldStart < slide) {
        sum -= data[windowStart];
        count -= 1;
        windowStart += 1;
      }
    }
    sum += data[i];
    count += 1;
  }

  if (count == range) {
    values.push(sum / count);
  }

  return values;
};
