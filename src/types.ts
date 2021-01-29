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
export type ArrayType<T> = Array<T> | ReadonlyArray<T> | TypedArray;

type MutableArrayDownsamplingFunction<InputDataPoint, Params extends unknown[], OutputDataPoint = InputDataPoint> = (
  data: Array<InputDataPoint>,
  ...Params: Params
) => Array<OutputDataPoint>;
// type ReadonlyArrayDownsamplingFunction<InputDataPoint, Params extends unknown[], OutputDataPoint = InputDataPoint> = (data: ReadonlyArray<InputDataPoint>, ...Params: Params) => ReadonlyArray<OutputDataPoint>;

// export type ArrayDownsamplingFunction<InputDataPoint, Params extends unknown[], OutputDataPoint = InputDataPoint> = MutableArrayDownsamplingFunction<InputDataPoint, Params, OutputDataPoint> | ReadonlyArrayDownsamplingFunction<InputDataPoint, Params, OutputDataPoint>
export type ArrayDownsamplingFunction<
  InputDataPoint,
  Params extends unknown[],
  OutputDataPoint = InputDataPoint
> = MutableArrayDownsamplingFunction<InputDataPoint, Params, OutputDataPoint>;
export type TypedArrayDownsamplingFunction<
  InputDataArray extends TypedArray,
  Params extends unknown[],
  OutputDataArray = InputDataArray
> = (data: InputDataArray, ...Params: Params) => OutputDataArray;

// export type DownsamplingFunction<InputDataPoint, A extends unknown[], OutputDataPoint = InputDataPoint> = (data: InputDataPoint[], ...Params: A) => OutputDataPoint[];

// export type DownsamplingFunction<InputDataPoint, Params extends unknown[], OutputDataPoint = InputDataPoint> = (data: Array<InputDataPoint>, ...Params: Params) => Array<OutputDataPoint>;
// export type DownsamplingFunction<InputDataPoint, Params extends unknown[], OutputDataPoint = InputDataPoint> = ArrayDownsamplingFunction<InputDataPoint, Params, OutputDataPoint> | ReadonlyArrayDownsamplingFunction<InputDataPoint, Params, OutputDataPoint>

// export type DownsamplingFunction<E, P extends unknown[], I extends ArrayType<E> = ArrayType<E>, O = I> = (data: ArrayType<I>, ...Params: P) => O[];
// export type DownsamplingFunction<InputDataPoint, P extends unknown[], OutputDataPoint = InputDataPoint, InputArray extends ArrayType<InputDataPoint> = ArrayType<InputDataPoint>, OutputArray extends ArrayType<OutputDataPoint> = InputArray> = (data: ArrayType<InputDataPoint>, ...Params: P) => ArrayType<OutputDataPoint>;
