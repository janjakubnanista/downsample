import { DataPoint, DownsamplingFunction } from '../../types';
import { SMA, SMANumeric, createSMA } from '../SMA';
import {
  makeTupleDateTestData,
  makeTupleNumberTestData,
  makeXYDateTestData,
  makeXYNumberTestData,
  testTypedArrays,
} from './utils';
import data from '../../../data/power.json';

describe('SMANumeric', () => {
  describe('with XYDataPoint with Date', () => testMethod(makeXYDateTestData(data)));
  describe('with TupleDataPoint with Date', () => testMethod(makeTupleDateTestData(data)));
  describe('with XYDataPoint with number', () => testMethod(makeXYNumberTestData(data)));
  describe('with TupleDataPoint with number', () => testMethod(makeTupleNumberTestData(data)));

  function testMethod(dataPoints: DataPoint[]) {
    const data = dataPoints.map((point) => ('y' in point ? point.y : point[1]));

    it('should return the same array if window size and slide are both 1', () => {
      expect(SMANumeric(data, 1, 1)).toEqual(data);
    });

    it('should return (N - window size + 1) data points', () => {
      expect(SMANumeric(data, 2, 1)).toHaveLength(data.length - 1);
      expect(SMANumeric(data, 4, 1)).toHaveLength(data.length - 3);
      expect(SMANumeric(data, 5, 1)).toHaveLength(data.length - 4);
    });

    it('should return (N / slide [+ 1]) data points', () => {
      expect(SMANumeric(data, 1, 2)).toHaveLength(data.length / 2);
      expect(SMANumeric(data, 1, 3)).toHaveLength(data.length / 3);
      expect(SMANumeric(data, 1, 4)).toHaveLength(data.length / 4);
    });

    it('should return okay numbers', () => {
      const evenData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const oddData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      expect(SMANumeric(data, 5, 1)).toMatchSnapshot();
      expect(SMANumeric(data, 2, 1)).toMatchSnapshot();
      expect(SMANumeric(data, 4, 1)).toMatchSnapshot();
      expect(SMANumeric(evenData, 1, 2)).toMatchSnapshot();
      expect(SMANumeric(evenData, 2, 3)).toMatchSnapshot();
      expect(SMANumeric(evenData, 1, 4)).toMatchSnapshot();
      expect(SMANumeric(oddData, 1, 2)).toMatchSnapshot();
      expect(SMANumeric(oddData, 2, 3)).toMatchSnapshot();
      expect(SMANumeric(oddData, 3, 4)).toMatchSnapshot();
    });

    it('should smooth correctly', () => {
      expect(SMANumeric(data, 5, 1)).toMatchSnapshot();
      expect(SMANumeric(data, 2, 10)).toMatchSnapshot();
      expect(SMANumeric(data, 4, 100)).toMatchSnapshot();
      expect(SMANumeric(data, 100, 100)).toMatchSnapshot();
      expect(SMANumeric(data, 1000, 1000)).toMatchSnapshot();
      expect(SMANumeric(data, 1000, 3)).toMatchSnapshot();
    });
  }
});

describe('SMA', () => {
  describe('with XYDataPoint with Date', () => testStuff(makeXYDateTestData(data), SMA));
  describe('with TupleDataPoint with Date', () => testStuff(makeTupleDateTestData(data), SMA));
  describe('with XYDataPoint with number', () => testStuff(makeXYNumberTestData(data), SMA));
  describe('with TupleDataPoint with number', () => testStuff(makeTupleNumberTestData(data), SMA));

  it(
    'should return a typed array when given a typed array',
    testTypedArrays(
      createSMA<number>({
        x: (point: number, index: number) => index,
        y: (point: number) => point,
        toPoint: (x, y) => y,
      }),
      5,
      2,
    ),
  );

  describe('createSMA', () => {
    describe('with string / number x / y', () => {
      describe('with XYDataPoint with number', () =>
        testStuff(
          makeXYNumberTestData(data),
          createSMA({
            x: 'x',
            y: 'y',
            toPoint: (x, y) => ({ x, y }),
          }),
        ));
      describe('with TupleDataPoint with number', () =>
        testStuff(
          makeTupleNumberTestData(data),
          createSMA({
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
          createSMA({
            x: (value) => value.x.getTime(),
            y: 'y',
            toPoint: (x, y) => ({ x: new Date(x), y }),
          }),
        ));
      describe('with TupleDataPoint with Date', () =>
        testStuff(
          makeTupleDateTestData(data),
          createSMA({
            x: (value) => value[0].getTime(),
            y: 1,
            toPoint: (x, y) => [new Date(x), y] as [Date, number],
          }),
        ));
    });
  });

  function testStuff<T>(data: T[], method: DownsamplingFunction<T, [number, number]>): void {
    it('should return the same length array if window size and slide are both 1', () => {
      expect(method(data, 1, 1)).toHaveLength(data.length);
    });

    it('should return (N - window size + 1) data points', () => {
      expect(method(data, 2, 1)).toHaveLength(data.length - 1);
      expect(method(data, 50, 1)).toHaveLength(data.length - 49);
    });

    it('should smooth correctly', () => {
      expect(method(data, 5, 1)).toMatchSnapshot();
      expect(method(data, 100, 100)).toMatchSnapshot();
      expect(method(data, 1000, 1000)).toMatchSnapshot();
      expect(method(data, 1000, 3)).toMatchSnapshot();
    });
  }
});
