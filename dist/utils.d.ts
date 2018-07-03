import { DataPoint, NormalizedDataPoint } from "./types";
export declare function normalizeDataPoint(dataPoint: DataPoint): NormalizedDataPoint;
export declare function normalizeDataPoints(dataPoints: DataPoint[]): NormalizedDataPoint[];
export declare function calculateTriangleArea(pointA: NormalizedDataPoint, pointB: NormalizedDataPoint, pointC: NormalizedDataPoint): number;
export declare function calculateAverageDataPoint(...points: NormalizedDataPoint[]): NormalizedDataPoint;
