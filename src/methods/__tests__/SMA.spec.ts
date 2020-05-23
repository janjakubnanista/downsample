import { DataPoint } from '../../types';
import { SMA, SMANumeric } from '../SMA';
import { makeTupleDateTestData, makeTupleNumberTestData, makeXYDateTestData, makeXYNumberTestData } from './utils';
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
  describe('with XYDataPoint with Date', () => testMethod(makeXYDateTestData(data)));
  describe('with TupleDataPoint with Date', () => testMethod(makeTupleDateTestData(data)));
  describe('with XYDataPoint with number', () => testMethod(makeXYNumberTestData(data)));
  describe('with TupleDataPoint with number', () => testMethod(makeTupleNumberTestData(data)));

  function testMethod(data: DataPoint[]) {
    it('should return the same length array if window size and slide are both 1', () => {
      expect(SMA(data, 1, 1)).toHaveLength(data.length);
    });

    it('should return (N - window size + 1) data points', () => {
      expect(SMA(data, 2, 1)).toHaveLength(data.length - 1);
      expect(SMA(data, 50, 1)).toHaveLength(data.length - 49);
    });

    it('should smooth correctly', () => {
      expect(SMA(data, 5, 1)).toMatchSnapshot();
      expect(SMA(data, 100, 100)).toMatchSnapshot();
      expect(SMA(data, 1000, 1000)).toMatchSnapshot();
      expect(SMA(data, 1000, 3)).toMatchSnapshot();
    });
  }
});
