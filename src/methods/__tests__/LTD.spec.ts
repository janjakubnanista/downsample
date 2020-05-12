import 'jest';
import { DataPoint } from '../../types';
import { LTD } from '../LTD';
import { makeTupleDateTestData, makeTupleNumberTestData, makeXYDateTestData, makeXYNumberTestData } from './utils';
import data from './testdata.json';

describe('LTD', () => {
  const MAX_DATA_LENGTH = 5000;

  describe('with XYDataPoint with Date', () => testMethod(makeXYDateTestData(data).slice(0, MAX_DATA_LENGTH)));
  describe('with TupleDataPoint with Date', () => testMethod(makeTupleDateTestData(data).slice(0, MAX_DATA_LENGTH)));
  describe('with XYDataPoint with number', () => testMethod(makeXYNumberTestData(data).slice(0, MAX_DATA_LENGTH)));
  describe('with TupleDataPoint with number', () =>
    testMethod(makeTupleNumberTestData(data).slice(0, MAX_DATA_LENGTH)));

  function testMethod(data: DataPoint[]) {
    it('should throw an error if desiredLength is negative', () => {
      expect(() => LTD(data, -1)).toThrow();
    });

    it('should return the whole data set if there are two data points', () => {
      expect(LTD(data.slice(0, 2), 1)).toHaveLength(2);
    });

    it('should return the whole data set if desiredLength is larger than the data set length', () => {
      expect(LTD(data, data.length + 40)).toHaveLength(data.length);
    });

    it('should return desired number of data points', () => {
      expect(LTD(data, 3)).toHaveLength(3);
      expect(LTD(data, 5)).toHaveLength(5);
      expect(LTD(data, 7)).toHaveLength(7);
      expect(LTD(data, 8)).toHaveLength(8);
    });

    it('should preserve the first and last data points', () => {
      expect(LTD(data, 5)[0]).toEqual(data[0]);
      expect(LTD(data, 5)[4]).toEqual(data[data.length - 1]);
    });

    it('should downsample correctly', () => {
      expect(LTD(data, 1)).toMatchSnapshot();
      expect(LTD(data, 2)).toMatchSnapshot();
      expect(LTD(data, 5)).toMatchSnapshot();
      expect(LTD(data, 100)).toMatchSnapshot();
      expect(LTD(data, 1000)).toMatchSnapshot();
      expect(LTD(data, Math.round(data.length / 2))).toMatchSnapshot();
    });
  }
});
