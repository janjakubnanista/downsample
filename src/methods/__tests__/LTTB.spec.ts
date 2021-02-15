import 'jest';
import { DownsamplingFunction } from '../../types';
import { LTTB, createLTTB } from '../LTTB';
import {
  makeTupleDateTestData,
  makeTupleNumberTestData,
  makeXYDateTestData,
  makeXYNumberTestData,
  testTypedArrays,
} from './utils';
import data from '../../../data/power.json';

describe('LTTB', () => {
  describe('with XYDataPoint with Date', () => testStuff(makeXYDateTestData(data), LTTB));
  describe('with TupleDataPoint with Date', () => testStuff(makeTupleDateTestData(data), LTTB));
  describe('with XYDataPoint with number', () => testStuff(makeXYNumberTestData(data), LTTB));
  describe('with TupleDataPoint with number', () => testStuff(makeTupleNumberTestData(data), LTTB));

  it(
    'should return a typed array when given a typed array',
    testTypedArrays(
      createLTTB<number>({
        x: (point: number, index: number) => index,
        y: (point: number) => point,
      }),
      5,
    ),
  );

  describe('createLTTB', () => {
    describe('with string / number x / y', () => {
      describe('with XYDataPoint with number', () =>
        testStuff(
          makeXYNumberTestData(data),
          createLTTB({
            x: 'x',
            y: 'y',
          }),
        ));
      describe('with TupleDataPoint with number', () =>
        testStuff(
          makeTupleNumberTestData(data),
          createLTTB({
            x: 0,
            y: 1,
          }),
        ));
    });

    describe('with function x / y', () => {
      describe('with XYDataPoint with Date', () =>
        testStuff(
          makeXYDateTestData(data),
          createLTTB({
            x: (value) => value.x.getTime(),
            y: 'y',
          }),
        ));
      describe('with TupleDataPoint with Date', () =>
        testStuff(
          makeTupleDateTestData(data),
          createLTTB({
            x: (value) => value[0].getTime(),
            y: 1,
          }),
        ));
    });
  });

  function testStuff<T>(data: T[], method: DownsamplingFunction<T, [number]>): void {
    it('should throw an error if desiredLength is negative', () => {
      expect(() => method(data, -1)).toThrow();
    });

    it('should return the whole data set if there are two data points', () => {
      expect(method(data.slice(0, 2), 1)).toHaveLength(2);
    });

    it('should return the whole data set if desiredLength is larger than the data set length', () => {
      expect(method(data, data.length + 40)).toHaveLength(data.length);
    });

    it('should return desired number of data points', () => {
      expect(method(data, 3)).toHaveLength(3);
      expect(method(data, 5)).toHaveLength(5);
      expect(method(data, 7)).toHaveLength(7);
      expect(method(data, 8)).toHaveLength(8);
    });

    it('should preserve the first and last data points', () => {
      expect(method(data, 5)[0]).toEqual(data[0]);
      expect(method(data, 5)[4]).toEqual(data[data.length - 1]);
    });

    it('should downsample larger date based data correctly', () => {
      expect(method(data, 1)).toMatchSnapshot();
      expect(method(data, 2)).toMatchSnapshot();
      expect(method(data, 5)).toMatchSnapshot();
      expect(method(data, 1000)).toMatchSnapshot();
      expect(method(data, Math.round(data.length / 2))).toMatchSnapshot();
    });
  }
});
