import { DataPoint, NormalizedDataPoint } from "./types";

export function normalizeDataPoint(dataPoint: DataPoint): NormalizedDataPoint {
  if (!dataPoint) return undefined;

  const x: number = dataPoint.x instanceof Date ? dataPoint.x.getTime() : dataPoint.x;
  const y: number = dataPoint.y;

  return [x, y];
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