import 'jest';
import { DataPoint } from '../../types';
import { LTOB } from '../LTOB';
import { makeTupleDateTestData, makeTupleNumberTestData, makeXYDateTestData, makeXYNumberTestData } from './utils';
import data from '../../../data/power.json';

describe('LTOB', () => {
  describe('with XYDataPoint with Date', () => testMethod(makeXYDateTestData(data)));
  describe('with TupleDataPoint with Date', () => testMethod(makeTupleDateTestData(data)));
  describe('with XYDataPoint with number', () => testMethod(makeXYNumberTestData(data)));
  describe('with TupleDataPoint with number', () => testMethod(makeTupleNumberTestData(data)));

  function testMethod(data: DataPoint[]) {
    it('should throw an error if desiredLength is negative', () => {
      expect(() => LTOB(data, -1)).toThrow();
    });

    it('should return the whole data set if there are two data points', () => {
      expect(LTOB(data.slice(0, 2), 1)).toHaveLength(2);
    });

    it('should return the whole data set if desiredLength is larger than the data set length', () => {
      expect(LTOB(data, data.length + 40)).toHaveLength(data.length);
    });

    it('should return desired number of data points', () => {
      expect(LTOB(data, 3)).toHaveLength(3);
      expect(LTOB(data, 5)).toHaveLength(5);
      expect(LTOB(data, 7)).toHaveLength(7);
      expect(LTOB(data, 8)).toHaveLength(8);
    });

    it('should preserve the first and last data points', () => {
      expect(LTOB(data, 5)[0]).toEqual(data[0]);
      expect(LTOB(data, 5)[4]).toEqual(data[data.length - 1]);
    });

    it('should downsample correctly', () => {
      expect(LTOB(data, 1)).toMatchSnapshot();
      expect(LTOB(data, 2)).toMatchSnapshot();
      expect(LTOB(data, 5)).toMatchSnapshot();
      expect(LTOB(data, 1000)).toMatchSnapshot();
      expect(LTOB(data, Math.round(data.length / 2))).toMatchSnapshot();
    });
  }
});
