import { DataPoint, NormalizedDataPoint } from "../types";
import { normalizeDataPoints, calculateTriangleArea, calculateAverageDataPoint, splitIntoBuckets } from "../utils";

export function LTTBIndexesForBuckets(buckets: NormalizedDataPoint[][]): number[] {
  const bucketCount: number = buckets.length;
  const bucketDataPointIndexes: number[] = [0];

  let previousBucketsSize: number = 1;
  let lastSelectedDataPoint: NormalizedDataPoint = buckets[0][0];
  for (let index: number = 1; index < bucketCount - 1; index++) {
    const bucket: NormalizedDataPoint[] = buckets[index];
    const nextBucket: NormalizedDataPoint[] = buckets[index + 1];
    const averageDataPointFromNextBucket = calculateAverageDataPoint(...nextBucket);
    if (averageDataPointFromNextBucket === undefined) continue;

    let maxArea = -1;
    let maxAreaIndex = -1;
    for (let j: number = 0; j < bucket.length; j++) {
      const dataPoint: NormalizedDataPoint = bucket[j];
      const area = calculateTriangleArea(lastSelectedDataPoint, dataPoint, averageDataPointFromNextBucket);

      if (area > maxArea) {
        maxArea = area;
        maxAreaIndex = j;
      }
    }

    lastSelectedDataPoint = bucket[maxAreaIndex];
    bucketDataPointIndexes.push(previousBucketsSize + maxAreaIndex);

    previousBucketsSize += bucket.length;
  }

  bucketDataPointIndexes.push(previousBucketsSize);

  return bucketDataPointIndexes;
}

// Largest triangle three buckets data downsampling algorithm implementation
export default function LTTB<T extends DataPoint>(data: T[], desiredLength: number): T[] {
  if (desiredLength < 0) {
    throw new Error(`Supplied negative desiredLength parameter to LTTB: ${desiredLength}`);
  }

  const { length } = data;
  if (length <= 1 || length <= desiredLength) {
    return data;
  }

  const normalizedData: NormalizedDataPoint[] = normalizeDataPoints(data);
  const buckets: NormalizedDataPoint[][] = splitIntoBuckets(normalizedData, desiredLength);
  const bucketDataPointIndexes: number[] = LTTBIndexesForBuckets(buckets);
  const dataPoints: T[] = bucketDataPointIndexes.map<T>((index: number) => data[index]);

  return dataPoints;
}