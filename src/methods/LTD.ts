import { DataPoint, NormalizedDataPoint } from "../types";
import { normalizeDataPoints, splitIntoBuckets } from "../utils";
import { LTTBIndexesForBuckets } from "./LTTB";

export const mergeBucketAt = (buckets: NormalizedDataPoint[][], index: number): NormalizedDataPoint[][] => {
  const bucketA: NormalizedDataPoint[] = buckets[index];
  const bucketB: NormalizedDataPoint[] = buckets[index + 1];
  if (!bucketA || !bucketB) {
    throw new Error(`Bucket index out of range for merging: ${index} (allowed indexes are 0 - ${buckets.length - 2}`);
  }

  const mergedBucket: NormalizedDataPoint[] = [...bucketA, ...bucketB];

  const newBuckets = buckets.slice();
  newBuckets.splice(index, 2, mergedBucket);

  return newBuckets;
}

export const splitBucketAt = (buckets: NormalizedDataPoint[][], index: number): NormalizedDataPoint[][] => {
  const bucket: NormalizedDataPoint[] = buckets[index];
  if (!bucket) {
    throw new Error(`Bucket index out of range for splitting: ${index} (allowed indexes are 0 - ${buckets.length - 1}`);
  }

  const bucketSize: number = bucket.length;
  if (bucketSize < 2) {
    return buckets;
  }

  const bucketALength = Math.ceil(bucketSize / 2);
  const bucketA: NormalizedDataPoint[] = bucket.slice(0, bucketALength);
  const bucketB: NormalizedDataPoint[] = bucket.slice(bucketALength);

  const newBuckets = buckets.slice();
  newBuckets.splice(index, 1, bucketA, bucketB);

  return newBuckets;
}

export const calculateLinearRegressionCoefficients = (data: NormalizedDataPoint[]): [number, number] => {
  const N:number = data.length;

  let averageX: number = 0;
  let averageY: number = 0;
  for (let i: number = 0; i < N; i++) {
    averageX += data[i][0];
    averageY += data[i][1];
  }

  averageX /= N;
  averageY /= N;

  let aNumerator: number = 0;
  let aDenominator: number = 0;
  for (let i: number = 0; i < N; i++) {
    const [x, y]: NormalizedDataPoint = data[i];
    aNumerator += (x - averageX) * (y - averageY);
    aDenominator += (x - averageX) * (x - averageX);
  }

  const a: number = aNumerator / aDenominator;
  const b: number = averageY - a * averageX;

  return [a, b];
}

export const calculateSSEForBucket = (dataPoints: NormalizedDataPoint[]): number => {
  const [a, b] = calculateLinearRegressionCoefficients(dataPoints);

  let sumStandardErrorsSquared = 0;
  for (let i: number = 0; i < dataPoints.length; i++) {
    const dataPoint: NormalizedDataPoint = dataPoints[i];
    const standardError: number = dataPoint[1] - (a * dataPoint[0] + b);

    sumStandardErrorsSquared += standardError * standardError;
  }

  return sumStandardErrorsSquared;
}

export const calculateSSEForBuckets = (buckets: NormalizedDataPoint[][]): number[] => {
  // We skip the first and last buckets since they only contain one data point
  const sse: number[] = [0];

  for (let i: number = 1; i < buckets.length - 1; i++) {
    const previousBucket: NormalizedDataPoint[] = buckets[i - 1];
    const currentBucket: NormalizedDataPoint[] = buckets[i];
    const nextBucket: NormalizedDataPoint[] = buckets[i + 1];
    const bucketWithAdjacentPoints: NormalizedDataPoint[] = [
      previousBucket[previousBucket.length - 1],
      ...currentBucket,
      nextBucket[0]
    ];

    sse.push(calculateSSEForBucket(bucketWithAdjacentPoints));
  }

  sse.push(0);

  return sse;
}

export const findLowestSSEAdjacentBucketsIndex = (sse: number[], ignoreIndex: number): number => {
  let minSSESum: number = Number.MAX_VALUE;
  let minSSEIndex: number = undefined;
  for (let i: number = 1; i < sse.length - 2; i++) {
    if (i === ignoreIndex  || i + 1 === ignoreIndex) {
      continue;
    }

    if (sse[i] + sse[i + 1] < minSSESum) {
      minSSESum = sse[i] + sse[i + 1];
      minSSEIndex = i;
    }
  }

  return minSSEIndex;
}

export const findHighestSSEBucketIndex = (buckets: NormalizedDataPoint[][], sse: number[]): number => {
  let maxSSE: number = 0;
  let maxSSEIndex: number = undefined;
  for (let i: number = 1; i < sse.length - 1; i++) {
    if (buckets[i].length > 1 && sse[i] > maxSSE) {
      maxSSE = sse[i];
      maxSSEIndex = i;
    }
  }

  return maxSSEIndex;
}

// Largest triangle three buckets data downsampling algorithm implementation
export default function LTD<T extends DataPoint>(data: T[], desiredLength: number): T[] {
  if (desiredLength < 0) {
    throw new Error(`Supplied negative desiredLength parameter to LTD: ${desiredLength}`);
  }

  const { length } = data;
  if (length <= 2 || length <= desiredLength) {
    return data;
  }

  // Now we are sure that:
  //
  // - length is [2, Infinity)
  // - threshold is (length, Inifnity)
  const normalizedData: NormalizedDataPoint[] = normalizeDataPoints(data);

  // Require: data . The original data
  // Require: threshold . Number of data points to be returned
  // 1: Split the data into equal number of buckets as the threshold but have the first
  // bucket only containing the first data point and the last bucket containing only
  // the last data point . First and last buckets are then excluded in the bucket
  // resizing
  // 2: Calculate the SSE for the buckets accordingly . With one point in adjacent
  // buckets overlapping
  // 3: while halting condition is not met do . For example, using formula 4.2
  // 4: Find the bucket F with the highest SSE
  // 5: Find the pair of adjacent buckets A and B with the lowest SSE sum . The
  // pair should not contain F
  // 6: Split bucket F into roughly two equal buckets . If bucket F contains an odd
  // number of points then one bucket will contain one more point than the other
  // 7: Merge the buckets A and B
  // 8: Calculate the SSE of the newly split up and merged buckets
  // 9: end while.
  // 10: Use the Largest-Triangle-Three-Buckets algorithm on the resulting bucket configuration
  // to select one point per buckets

  let buckets: NormalizedDataPoint[][] = splitIntoBuckets(normalizedData, desiredLength);
  const numIterations = (length * 10) / desiredLength;
  for (let iteration: number = 0; iteration < numIterations; iteration++) {
    // 2: Calculate the SSE for the buckets accordingly . With one point in adjacent
    // buckets overlapping
    const sseForBuckets: number[] = calculateSSEForBuckets(buckets);

    // 4: Find the bucket F with the highest SSE
    const highestSSEBucketIndex: number = findHighestSSEBucketIndex(buckets, sseForBuckets);
    if (highestSSEBucketIndex === undefined) {
      break;
    }

    // 5: Find the pair of adjacent buckets A and B with the lowest SSE sum . The
    // pair should not contain F
    const lowestSSEAdajacentBucketIndex: number = findLowestSSEAdjacentBucketsIndex(sseForBuckets, highestSSEBucketIndex);
    if (lowestSSEAdajacentBucketIndex === undefined) {
      break;
    }

    // 6: Split bucket F into roughly two equal buckets . If bucket F contains an odd
    // number of points then one bucket will contain one more point than the other
    buckets = splitBucketAt(buckets, highestSSEBucketIndex);

    // 7: Merge the buckets A and B
    // If the lowest SSE index was after the highest index in the original
    // unsplit array then we need to move it by one up since now the array has one more element
    // before this index
    buckets = mergeBucketAt(buckets, lowestSSEAdajacentBucketIndex > highestSSEBucketIndex ? lowestSSEAdajacentBucketIndex + 1 : lowestSSEAdajacentBucketIndex);
  }

  const dataPointIndexes: number[] = LTTBIndexesForBuckets(buckets);
  const dataPoints: T[] = dataPointIndexes.map<T>((index: number) => data[index]);

  return dataPoints;
}