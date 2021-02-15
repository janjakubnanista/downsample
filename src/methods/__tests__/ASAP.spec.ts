import 'jest';
import { ASAP, createASAP } from '../ASAP';
import { DownsamplingFunction } from '../../types';
import {
  makeTupleDateTestData,
  makeTupleNumberTestData,
  makeXYDateTestData,
  makeXYNumberTestData,
  testTypedArrays,
} from './utils';
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

  it(
    'should return a typed array when given a typed array',
    testTypedArrays(
      createASAP<number>({
        x: (point: number, index: number) => index,
        y: (point: number) => point,
        toPoint: (x, y) => y,
      }),
      5,
    ),
  );

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

  function testStuff<T>(data: T[], method: DownsamplingFunction<T, [number]>): void {
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
