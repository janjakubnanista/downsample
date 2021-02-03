/**
 * Possible types for the X coordinate (most probably time)
 */
export type X = number | Date;

/**
 * Possible types for the Value coordinate
 *
 * TODO Maybe add bigint
 */
export type Value = number;

export type NormalizedDataPoint = { x: number; y: Value };

// export type NumericPropertyNames<T> = {
//   [K in keyof T]: T[K] extends Value ? K : never;
// }[keyof T];

// TODO P extends [] does not cover all the tuple cases with heterogenous tuples
// and it would be nice to have a (generated) type for that
// export type NumericPropertyAccessor<P> = P extends unknown[] ? number : NumericPropertyNames<P>;

// export type PointValueExtractor<P> = (point: P, index: number) => Value;

// export interface DownsamplingFunctionConfig<P> {
//   x: NumericPropertyAccessor<P> | PointValueExtractor<P>;
//   y: NumericPropertyAccessor<P> | PointValueExtractor<P>;
// }

// export interface SmoothingFunctionConfig<P> extends DownsamplingFunctionConfig<P> {
//   toPoint: (x: number, y: number, index: number) => P;
// }

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

export type AllowedArray<Point> = Point extends number ? TypedArray | Point[] : Point[];

export type DownsamplingFunction<Point, Params extends unknown[] = [], OutputPoint = Point> = <
  InputArray extends AllowedArray<Point>,
  OutputArray extends AllowedArray<OutputPoint>
>(
  data: InputArray,
  ...params: Params
) => OutputArray;

export interface DownsamplerConfig<I, O = I> {
  transformInput: (input: I) => Iterable<NormalizedDataPoint>;
  transformOutput: (output: NormalizedDataPoint[]) => O;
}
