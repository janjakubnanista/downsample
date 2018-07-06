import { DataPoint, NormalizedDataPoint } from "../types";
import { normalizeDataPoints, calculateTriangleArea, calculateAverageDataPoint } from "../utils";

// Largest triangle three buckets data downsampling algorithm implementation
export default function LTTB<T extends DataPoint>(data: T[], desiredLength: number): T[] {
  if (desiredLength < 0) {
    throw new Error(`Supplied negative desiredLength parameter to LTTB: ${desiredLength}`);
  }

  const { length } = data;
  if (length <= 1 || length <= desiredLength) {
    return data;
  }

  // Now we are sure that:
  //
  // - length is [2, Infinity)
  // - threshold is (length, Inifnity)
  const bucketSize: number = length / desiredLength;
  const normalizedData: NormalizedDataPoint[] = normalizeDataPoints(data);
  const sampledData: T[] = [data[0]];

  let lastSelectedDataPoint: NormalizedDataPoint = normalizedData[0];
  for (let bucket: number = 1; bucket < desiredLength - 1; bucket++) {
    const bucketStartIndex = Math.floor(bucket * bucketSize);
    const nextBucketStartIndex: number = Math.min(length - 1, (bucket + 1) * bucketSize);
    const nextBucketEndIndex: number = Math.min(length - 1, (bucket + 2) * bucketSize) + 1;
    const dataPointsInNextBucket: NormalizedDataPoint[] = normalizedData.slice(nextBucketStartIndex, nextBucketEndIndex);
    const averageDataPointFromNextBucket = calculateAverageDataPoint(...dataPointsInNextBucket);

    let maxArea = -1;
    let maxAreaIndex = -1;
    for (let j: number = bucketStartIndex; j < nextBucketStartIndex; j++) {
      const dataPoint: NormalizedDataPoint = normalizedData[j];
      const area = calculateTriangleArea(lastSelectedDataPoint, dataPoint, averageDataPointFromNextBucket);

      if (area > maxArea) {
        maxArea = area;
        maxAreaIndex = j;
      }
    }

    lastSelectedDataPoint = normalizedData[maxAreaIndex];

    sampledData.push(data[maxAreaIndex]);
  }

  sampledData.push(data[length - 1]);

  return sampledData;
}