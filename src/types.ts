/**
 * Possible types for the X coordinate (most probably time)
 */
export type X = number | Date;

/**
 * Possible types for the Value coordinate
 */
export type Value = number;

export type NormalizedDataPoint = [Value, Value];

export type TupleDataPoint = [X, Value];

export interface XYDataPoint {
  x: X;
  y: Value;
}

export type DataPoint = TupleDataPoint | XYDataPoint;

export type NumericPropertyNames<T> = {
  [K in keyof T]: T[K] extends Value ? K : never;
}[keyof T];

// TODO P extends [] does not cover all the tuple cases with heterogenous tuples
// and it would be nice to have a (generated) type for that
export type NumericPropertyAccessor<P> = P extends unknown[] ? number : NumericPropertyNames<P>;

export type PointValueExtractor<P> = (point: P) => Value;

export interface DownsamplingFunctionConfig<P> {
  x: NumericPropertyAccessor<P> | PointValueExtractor<P>;
  y: NumericPropertyAccessor<P> | PointValueExtractor<P>;
}

export interface SmoothingFunctionConfig<P> extends DownsamplingFunctionConfig<P> {
  toPoint: (x: number, y: number, index: number) => P;
}

export type DownsamplingFunction<I, A extends unknown[], O = I> = (data: I[], ...args: A) => O[];
