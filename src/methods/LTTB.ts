import { DownsamplingFunction, DownsamplingFunctionConfig, Indexable, NormalizedDataPoint } from '../types';
import {
  calculateAverageDataPoint,
  calculateTriangleArea,
  createLegacyDataPointConfig,
  createNormalize,
  iterableBasedOn,
  splitIntoBuckets,
} from '../utils';

export function LTTBIndexesForBuckets(buckets: NormalizedDataPoint[][]): number[] {
  const bucketCount: number = buckets.length;
  const bucketDataPointIndexes: number[] = [0];

  let previousBucketsSize = 1;
  let lastSelectedDataPoint: NormalizedDataPoint = buckets[0][0];
  for (let index = 1; index < bucketCount - 1; index++) {
    const bucket: NormalizedDataPoint[] = buckets[index];
    const nextBucket: NormalizedDataPoint[] = buckets[index + 1];
    const averageDataPointFromNextBucket = calculateAverageDataPoint(...nextBucket);
    if (averageDataPointFromNextBucket === undefined) continue;

    let maxArea = -1;
    let maxAreaIndex = -1;
    for (let j = 0; j < bucket.length; j++) {
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
export const createLTTB = <P>(config: DownsamplingFunctionConfig<P>): DownsamplingFunction<P, [number]> => {
  const normalize = createNormalize(config.x, config.y);

  return <Input extends Indexable<P> = Indexable<P>>(data: Input, desiredLength: number): Input => {
    if (desiredLength < 0) {
      throw new Error(`Supplied negative desiredLength parameter to LTTB: ${desiredLength}`);
    }

    const { length } = data;
    if (length <= 1 || length <= desiredLength) return data;

    const normalizedData: NormalizedDataPoint[] = normalize(data);
    const buckets: NormalizedDataPoint[][] = splitIntoBuckets(normalizedData, desiredLength);
    const bucketDataPointIndexes: number[] = LTTBIndexesForBuckets(buckets);
    const output = iterableBasedOn(data, bucketDataPointIndexes.length);

    for (let i = 0; i < bucketDataPointIndexes.length; i++) output[i] = data[bucketDataPointIndexes[i]];

    return output;
  };
};

export const LTTB = createLTTB(createLegacyDataPointConfig());
