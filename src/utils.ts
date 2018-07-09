import { DataPoint, NormalizedDataPoint, XYDataPoint, X, TupleDataPoint } from "./types";

const isTupleDataPoint = (dataPoint: DataPoint): dataPoint is TupleDataPoint => {
  return Array.isArray(dataPoint);
}

const isXYDataPoint = (dataPoint: DataPoint): dataPoint is XYDataPoint => {
  return !!dataPoint && "x" in dataPoint && "y" in dataPoint;
}

const normalizeX = (x: X): number => x instanceof Date ? x.getTime() : x;

export function normalizeDataPoint(dataPoint: DataPoint): NormalizedDataPoint {
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
  return dataPoints.map(normalizeDataPoint);
}

export function calculateTriangleArea(pointA: NormalizedDataPoint, pointB: NormalizedDataPoint, pointC: NormalizedDataPoint): number {
  return Math.abs((pointA[0] - pointC[0]) * (pointB[1] - pointA[1]) - (pointA[0] - pointB[0]) * (pointC[1] - pointA[1])) / 2;
}

export function calculateAverageDataPoint(...points: NormalizedDataPoint[]): NormalizedDataPoint {
  const { length } = points;
  if (!length) return undefined;

  let averageX: number = 0;
  let averageY: number = 0;
  for (let i: number = 0; i < length; i++) {
    averageX += points[i][0];
    averageY += points[i][1];
  }

  return [averageX / length, averageY / length];
}

export function splitIntoBuckets<T>(data: T[], desiredLength: number): T[][] {
  if (data.length === 2) {
    return [
      [data[0]],
      [data[1]]
    ];
  }

  const first: T = data[0];
  const center: T[] = data.slice(1, data.length - 1);
  const last: T = data[data.length - 1];

  // First and last bucket are formed by the first and the last data points
  // so we only have N - 2 buckets left to fill
  const bucketSize: number = center.length / (desiredLength - 2);
  const splitData: T[][] = [
    [first]
  ];

  for (let i: number = 0; i < desiredLength - 2; i++) {
    const bucketStartIndex: number = Math.floor(i * bucketSize);
    const bucketEndIndex: number = Math.floor((i + 1) * bucketSize);
    const dataPointsInBucket: T[] = center.slice(bucketStartIndex, bucketEndIndex);

    splitData.push(dataPointsInBucket);
  }

  splitData.push([last]);

  return splitData;
}