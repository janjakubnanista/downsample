import 'jest';
import { ASAP, createASAP, createTypedASAP } from '../ASAP';
import { ArrayDownsamplingFunction, SmoothingFunctionConfig } from '../../types';
import { makeTupleDateTestData, makeTupleNumberTestData, makeXYDateTestData, makeXYNumberTestData } from './utils';
import data from '../../../data/power.json';

describe('ASAP', () => {
  it('should return an empty array if empty array is passed', () => {
    expect(ASAP([], 1)).toEqual([]);
    expect(ASAP([], 10)).toEqual([]);
    expect(ASAP([], 100)).toEqual([]);
  });

  it('should not throw if short arrays are passed in', () => {
    expect(ASAP([[0, 1]], 1)).toMatchSnapshot();
    expect(
      ASAP(
        [
          [0, 1],
          [0, 2],
        ],
        10,
      ),
    ).toMatchSnapshot();
  });

  describe('with XYDataPoint with Date', () => testStuff(makeXYDateTestData(data), ASAP));
  describe('with TupleDataPoint with Date', () => testStuff(makeTupleDateTestData(data), ASAP));
  describe('with XYDataPoint with number', () => testStuff(makeXYNumberTestData(data), ASAP));
  describe('with TupleDataPoint with number', () => testStuff(makeTupleNumberTestData(data), ASAP));

  describe('createASAP', () => {
    describe('with string / number x / y', () => {
      describe('with XYDataPoint with number', () =>
        testStuff(
          makeXYNumberTestData(data),
          createASAP({
            x: 'x',
            y: 'y',
            toPoint: (x, y) => ({ x, y }),
          }),
        ));
      describe('with TupleDataPoint with number', () =>
        testStuff(
          makeTupleNumberTestData(data),
          createASAP({
            x: 0,
            y: 1,
            toPoint: (x, y) => [x, y],
          }),
        ));
    });

    describe('with function x / y', () => {
      describe('with XYDataPoint with Date', () =>
        testStuff(
          makeXYDateTestData(data),
          createASAP({
            x: (value) => value.x.getTime(),
            y: 'y',
            toPoint: (x, y) => ({ x: new Date(x), y }),
          }),
        ));
      describe('with TupleDataPoint with Date', () =>
        testStuff(
          makeTupleDateTestData(data),
          createASAP({
            x: (value) => value[0].getTime(),
            y: 1,
            toPoint: (x, y) => [new Date(x), y] as [Date, number],
          }),
        ));
    });
  });

  describe('createTypedASAP', () => {
    it('should return correct typed array type back', () => {
      const config: SmoothingFunctionConfig<number> = {
        x: (value: number) => value,
        y: (value: number, index: number) => index,
        toPoint: (x, y) => y,
      };

      const arrayData: Array<number> = Array.from([0, 1, 2, 4]);
      expect(createASAP(config)(arrayData, 1)).toBeInstanceOf(Array);

      const uint8Data: Uint8Array = Uint8Array.from([0, 1, 2, 4]);
      expect(createTypedASAP(config)(uint8Data, 1)).toBeInstanceOf(Uint8Array);

      const uint16Data: Uint16Array = Uint16Array.from([0, 1, 2, 4]);
      expect(createTypedASAP(config)(uint16Data, 1)).toBeInstanceOf(Uint16Array);

      const uint32Data: Uint32Array = Uint32Array.from([0, 1, 2, 4]);
      expect(createTypedASAP(config)(uint32Data, 1)).toBeInstanceOf(Uint32Array);

      const int8Data: Int8Array = Int8Array.from([0, 1, 2, 4]);
      expect(createTypedASAP(config)(int8Data, 1)).toBeInstanceOf(Int8Array);

      const int16Data: Int16Array = Int16Array.from([0, 1, 2, 4]);
      expect(createTypedASAP(config)(int16Data, 1)).toBeInstanceOf(Int16Array);

      const int32Data: Int32Array = Int32Array.from([0, 1, 2, 4]);
      expect(createTypedASAP(config)(int32Data, 1)).toBeInstanceOf(Int32Array);

      const float32Data: Float32Array = Float32Array.from([0, 1, 2, 4]);
      expect(createTypedASAP(config)(float32Data, 1)).toBeInstanceOf(Float32Array);

      const float64Data: Float64Array = Float64Array.from([0, 1, 2, 4]);
      expect(createTypedASAP(config)(float64Data, 1)).toBeInstanceOf(Float64Array);
    });
  });

  function testStuff<T>(data: T[], method: ArrayDownsamplingFunction<T, [number]>): void {
    it('should throw an error if desiredLength is negative', () => {
      expect(() => method(data, -1)).toThrow();
    });

    it('should throw an error if desiredLength is zero', () => {
      expect(() => method(data, 0)).toThrow();
    });

    [];

    it('should return desired number of data points', () => {
      expect(method(data, 3)).toHaveLength(3);
      expect(method(data, 5)).toHaveLength(5);
      expect(method(data, 7)).toHaveLength(7);
      expect(method(data, 8)).toHaveLength(8);
    });

    it('should downsample correctly', () => {
      expect(method(data, 1)).toMatchSnapshot();
      expect(method(data, 2)).toMatchSnapshot();
      expect(method(data, 5)).toMatchSnapshot();
      expect(method(data, 100)).toMatchSnapshot();
      expect(method(data, 1000)).toMatchSnapshot();
      expect(method(data, Math.round(data.length / 2))).toMatchSnapshot();
    });
  }
});
