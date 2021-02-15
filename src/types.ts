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

export type PointValueExtractor<P> = (point: P, index: number) => Value;

export interface DownsamplingFunctionConfig<P> {
  x: NumericPropertyAccessor<P> | PointValueExtractor<P>;
  y: NumericPropertyAccessor<P> | PointValueExtractor<P>;
}

export interface SmoothingFunctionConfig<P> extends DownsamplingFunctionConfig<P> {
  toPoint: (x: number, y: number, index: number) => P;
}

export type TypedArray =
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | Float32Array
  | Float64Array;

export type DefaultDataPoint = {
  x: number;
  y: number;
};

export type GetValueForIndex = (index: number) => number;

export type Transformer<Params extends unknown[] = []> = (
  length: number,
  getX: GetValueForIndex,
  getY: GetValueForIndex,
  ...params: Params
) => IterableIterator<DefaultDataPoint>;

export type Indexable<T> = {
  length: number;
  [index: number]: T;
};

export type ArrayDownsamplingFunction<T, Params extends unknown[] = []> = (data: T[], ...params: Params) => T[];
export type TypedArrayDownsamplingFunction<Params extends unknown[] = []> = <A extends TypedArray = TypedArray>(
  data: A,
  ...params: Params
) => A;

export type DownsamplingFunction<T, Params extends unknown[] = [], Input extends Indexable<T> = Indexable<T>> = (
  data: Input,
  ...params: Params
) => Input;
