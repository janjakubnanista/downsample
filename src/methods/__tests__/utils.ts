import { TypedArray } from '../../types';

export const makeXYDateTestData = (data: number[], maxLength?: number): { x: Date; y: number }[] =>
  data.map((value, index) => ({ x: new Date(index * 3600), y: value })).slice(0, maxLength);

export const makeXYNumberTestData = (data: number[], maxLength?: number): { x: number; y: number }[] =>
  data.map((value, index) => ({ x: index * 3600, y: value })).slice(0, maxLength);

export const makeTupleDateTestData = (data: number[], maxLength?: number): [Date, number][] =>
  data
    .map<[Date, number]>((value, index) => [new Date(index * 3600), value])
    .slice(0, maxLength);

export const makeTupleNumberTestData = (data: number[], maxLength?: number): [number, number][] =>
  data
    .map<[number, number]>((value, index) => [index * 3600, value])
    .slice(0, maxLength);

export const testTypedArrays = <Params extends unknown[] = unknown[]>(
  subject: (data: TypedArray, ...params: Params) => unknown,
  ...params: Params
): (() => void) => {
  const numbers = [1, 2, 3];

  return () => {
    const int8Data: Int8Array = new Int8Array(numbers);
    expect(subject(int8Data, ...params)).toBeInstanceOf(Int8Array);

    const int16Data: Int16Array = new Int16Array(numbers);
    expect(subject(int16Data, ...params)).toBeInstanceOf(Int16Array);

    const int32Data: Int32Array = new Int32Array(numbers);
    expect(subject(int32Data, ...params)).toBeInstanceOf(Int32Array);

    const uint8Data: Uint8Array = new Uint8Array(numbers);
    expect(subject(uint8Data, ...params)).toBeInstanceOf(Uint8Array);

    const uint8ClampedData: Uint8ClampedArray = new Uint8ClampedArray(numbers);
    expect(subject(uint8ClampedData, ...params)).toBeInstanceOf(Uint8ClampedArray);

    const uint16Data: Uint16Array = new Uint16Array(numbers);
    expect(subject(uint16Data, ...params)).toBeInstanceOf(Uint16Array);

    const uint32Data: Uint32Array = new Uint32Array(numbers);
    expect(subject(uint32Data, ...params)).toBeInstanceOf(Uint32Array);

    const float64Data: Float64Array = new Float64Array(numbers);
    expect(subject(float64Data, ...params)).toBeInstanceOf(Float64Array);

    const float32Data: Float32Array = new Float32Array(numbers);
    expect(subject(float32Data, ...params)).toBeInstanceOf(Float32Array);
  };
};
