import { DataPoint, NormalizedDataPoint } from "../types";
import { normalizeDataPoints, calculateTriangleArea, calculateAverageDataPoint } from "../utils";

// Largest triangle three buckets data downsampling algorithm implementation
export default function LTTB(data: DataPoint[], desiredLength: number): DataPoint[] {
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
  const sampledLength: number = desiredLength - 2;
  const bucketSize: number = Math.ceil(length / desiredLength);
  const normalizedData: NormalizedDataPoint[] = normalizeDataPoints(data);
  const sampledData: DataPoint[] = [data[0]];

  let lastSelectedDataPoint: NormalizedDataPoint = normalizedData[0];
  for (let bucket: number = 1; bucket < desiredLength - 1; bucket++) {
    const bucketStartIndex = bucket * bucketSize;
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







  let a: number = 0;
  const sampled: DataPoint[] = [data[0]];
  for (let i: number = 0; i < sampledLength; i++) {
    const averageXStartIndex: number = Math.floor((i + 1) * bucketSize) + 1;
    const averageXEndIndex: number = Math.min(length, Math.floor((i + 2) * bucketSize) + 1);

    let averageX: number = 0;
    let averageY: number = 0;
    for (let j: number = averageXStartIndex; j < averageXEndIndex; j++) {
      averageX += normalizedData[j][0];
      averageY += normalizedData[j][1];
    }

    const averageXSpan: number = averageXEndIndex - averageXStartIndex;
    averageX /= averageXSpan;
    averageY /= averageXSpan;
    const averageDataPoint: NormalizedDataPoint = [averageX, averageY];

    const rangeXStart = Math.floor(i * bucketSize) + 1;
    const rangeXEnd = Math.floor((i + 1) * bucketSize) + 1;

    const dataPointA: NormalizedDataPoint = normalizedData[a];
    let maxArea: number = -1;
    let maxAreaIndex: number;

    for (let k: number = rangeXStart; k < rangeXEnd; k++) {
      const dataPointK = normalizedData[k];
      const area = calculateTriangleArea(dataPointA, dataPointK, averageDataPoint);

      if (area > maxArea) {
        maxArea = area;
        maxAreaIndex = k;
      }
    }

    const maxAreaDataPoint: DataPoint = data[maxAreaIndex];

    a = maxAreaIndex;
    sampled.push(maxAreaDataPoint);
  }

  sampled.push(data[length - 1]);

  return sampled;
}