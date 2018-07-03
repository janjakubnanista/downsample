import { DataPoint, NormalizedDataPoint } from "../types";
import { normalizeDataPoints, calculateTriangleArea } from "../utils";

// Largest triangle three buckets data downsampling algorithm implementation
export default function LTOB(data: DataPoint[], desiredLength: number): DataPoint[] {
  if (desiredLength < 0) {
    throw new Error(`Supplied negative desiredLength parameter to LTOB: ${desiredLength}`);
  }

  const { length } = data;
  if (length <= 1 || length <= desiredLength) {
    return data;
  }

  // Now we are sure that:
  //
  // - length is [2, Infinity)
  // - threshold is (length, Inifnity)
  const bucketSize: number = Math.ceil(length / desiredLength);
  const normalizedData: NormalizedDataPoint[] = normalizeDataPoints(data);
  const sampledData: DataPoint[] = [data[0]];

  for (let bucket: number = 1; bucket < desiredLength - 1; bucket++) {
    const startIndex: number = bucket * bucketSize;
    const endIndex: number = Math.min(length - 1, (bucket + 1) * bucketSize);

    let maxArea = -1;
    let maxAreaIndex = -1;
    for (let j: number = startIndex; j < endIndex; j++) {
      const previousDataPoint: NormalizedDataPoint = normalizedData[j - 1];
      const dataPoint: NormalizedDataPoint = normalizedData[j];
      const nextDataPoint: NormalizedDataPoint = normalizedData[j + 1];

      const area = calculateTriangleArea(previousDataPoint, dataPoint, nextDataPoint);
      if (area > maxArea) {
        maxArea = area;
        maxAreaIndex = j;
      }
    }

    sampledData.push(data[maxAreaIndex]);
  }

  sampledData.push(data[length - 1]);

  return sampledData;
}