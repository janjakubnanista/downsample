import { DownsamplingFunction, Indexable, SmoothingFunctionConfig } from '../types';
import { SMANumeric, createSMA } from './SMA';
import { calculateMean, calculateSTD, createLegacyDataPointConfig, getPointValueExtractor, mapToArray } from '../utils';
import { fft, inverseFFT } from '../fft';

const calculateDiffs = (values: number[]): number[] => {
  const length = values.length - 1;
  if (length < 1) return [];

  const diffs = new Array(length);
  for (let i = 0; i < length; i++) {
    diffs[i] = values[i + 1] - values[i];
  }

  return diffs;
};

const calculateRoughness = (values: number[]): number => calculateSTD(calculateDiffs(values));

const calculateKurtosis = (values: number[]): number => {
  const length = values.length;
  const mean = calculateMean(values);

  let u4 = 0;
  let variance = 0;
  let diff: number;
  let diffSqr: number;
  for (let i = 0; i < length; i++) {
    diff = values[i] - mean;
    diffSqr = diff * diff;

    u4 += diffSqr * diffSqr;
    variance += diffSqr;
  }
  return (length * u4) / (variance * variance);
};

const findWindowSize = (
  head: number,
  tail: number,
  data: number[],
  minRoughness: number,
  originalKurt: number,
  windowSize: number,
): number => {
  while (head <= tail) {
    const w = Math.round((head + tail) / 2);
    const smoothed = SMANumeric(data, w, 1);
    const kurtosis = calculateKurtosis(smoothed);
    if (kurtosis >= originalKurt) {
      /* Search second half if feasible */
      const roughness = calculateRoughness(smoothed);
      if (roughness < minRoughness) {
        windowSize = w;
        minRoughness = roughness;
      }

      head = w + 1;
    } else {
      /* Search first half */
      tail = w - 1;
    }
  }

  return windowSize;
};

interface Autocorrelation {
  readonly peaks: number[];
  readonly correlations: number[];
  readonly maxCorrelation: number;
}

const calculatePeaks = (correlations: number[], threshold = 0.2): [number[], number] => {
  const { length } = correlations;
  if (length <= 1) return [[], 0];

  let maxCorrelation = 0;
  const peaks: number[] = [];

  if (correlations.length > 1) {
    let positive = correlations[1] > correlations[0];
    let max = 1;
    for (let i = 2; i < correlations.length; i += 1) {
      if (!positive && correlations[i] > correlations[i - 1]) {
        max = i;
        positive = !positive;
      } else if (positive && correlations[i] > correlations[max]) {
        max = i;
      } else if (positive && correlations[i] < correlations[i - 1]) {
        if (max > 1 && correlations[max] > threshold) {
          peaks.push(max);
          if (correlations[max] > maxCorrelation) {
            maxCorrelation = correlations[max];
          }
        }
        positive = !positive;
      }
    }
  }

  /* If there is no autocorrelation peak within the MAX_WINDOW boundary try windows from the largest to the smallest */
  if (peaks.length <= 1) {
    for (let i = 2; i < length; i += 1) {
      peaks.push(i);
    }
  }

  return [peaks, maxCorrelation];
};

const calculateAutocorrelation = (values: number[], maxLag: number): Autocorrelation => {
  const { length } = values;
  const mean = calculateMean(values);

  /* Padding to the closest power of 2 */
  const len = Math.pow(2, Math.trunc(Math.log2(length)) + 1);
  const fftreal = new Array(len).fill(0);
  const fftimg = new Array(len).fill(0);

  for (let i = 0; i < length; i += 1) {
    fftreal[i] = values[i] - mean;
  }

  /* F_R(f) = FFT(X) */
  fft(fftreal, fftimg);

  /* S(f) = F_R(f)F_R*(f) */
  for (let i = 0; i < fftreal.length; i += 1) {
    fftreal[i] = Math.pow(fftreal[i], 2) + Math.pow(fftimg[i], 2);
    fftimg[i] = 0;
  }

  /*  R(t) = IFFT(S(f)) */
  inverseFFT(fftreal, fftimg);

  // Calculate correlations
  const correlations: number[] = [];
  for (let i = 1; i < maxLag; i++) {
    correlations[i] = fftreal[i] / fftreal[0];
  }

  const [peaks, maxCorrelation] = calculatePeaks(correlations);

  return { correlations, peaks, maxCorrelation };
};

export const createASAP = <P>(config: SmoothingFunctionConfig<P>): DownsamplingFunction<P, [number]> => {
  const valueExtractor = getPointValueExtractor(config.y);
  const SMA = createSMA<P>(config);

  return function ASAP<Input extends Indexable<P> = Indexable<P>>(values: Input, resolution: number): Input {
    if (values.length === 0) return values;
    if (resolution <= 0) {
      throw new Error(`Supplied non-positive resolution parameter to ASAP: ${resolution}`);
    }

    // If the resolution is at least twice as big as the number of data points
    // then the values get downsampled to desired resolution first by SMA
    if (values.length >= 2 * resolution) {
      const scale = Math.trunc(values.length / resolution);

      return ASAP<Input>(SMA(values, scale, scale) as Input, resolution);
    }

    // First turn data points into a sequence of values
    const data: number[] = mapToArray(values, valueExtractor);

    const { correlations, peaks, maxCorrelation } = calculateAutocorrelation(data, Math.round(data.length / 10));
    const originalKurtosis = calculateKurtosis(data);
    let minRoughness = calculateRoughness(data);
    let windowSize = 1;
    let lb = 1;
    let largestFeasible = -1;
    let tail = data.length / 10;
    for (let i = peaks.length - 1; i >= 0; i -= 1) {
      const w = peaks[i];
      if (w < lb || w === 1) {
        break;
      } else if (Math.sqrt(1 - correlations[w]) * windowSize > Math.sqrt(1 - correlations[windowSize]) * w) {
        continue;
      }

      const smoothed = SMANumeric(data, w, 1);
      const kurtosis = calculateKurtosis(smoothed);
      const roughness = calculateRoughness(smoothed);
      if (kurtosis >= originalKurtosis) {
        if (roughness < minRoughness) {
          minRoughness = roughness;
          windowSize = w;
        }

        lb = Math.round(Math.max(w * Math.sqrt((maxCorrelation - 1) / (correlations[w] - 1)), lb));
        if (largestFeasible < 0) {
          largestFeasible = i;
        }
      }
    }

    if (largestFeasible > 0) {
      if (largestFeasible < peaks.length - 2) {
        tail = peaks[largestFeasible + 1];
      }
      lb = Math.max(lb, peaks[largestFeasible] + 1);
    }

    windowSize = findWindowSize(lb, tail, data, minRoughness, originalKurtosis, windowSize);

    return SMA(values, windowSize, 1) as Input;
  };
};

export const ASAP = createASAP(createLegacyDataPointConfig());
