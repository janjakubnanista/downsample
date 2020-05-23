import { DownsamplingFunction, DownsamplingFunctionConfig, NormalizedDataPoint } from '../types';
import { calculateTriangleArea, createLegacyDataPointConfig, createNormalize } from '../utils';

// Largest triangle three buckets data downsampling algorithm implementation
export const createLTOB = <P>(config: DownsamplingFunctionConfig<P>): DownsamplingFunction<P, [number]> => {
  const normalize = createNormalize(config.x, config.y);

  return (data: P[], desiredLength: number): P[] => {
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
    const bucketSize: number = length / desiredLength;
    const normalizedData: NormalizedDataPoint[] = normalize(data);
    const sampledData: P[] = [data[0]];

    for (let bucket = 1; bucket < desiredLength - 1; bucket++) {
      const startIndex: number = Math.floor(bucket * bucketSize);
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
  };
};

export const LTOB = createLTOB(createLegacyDataPointConfig());
