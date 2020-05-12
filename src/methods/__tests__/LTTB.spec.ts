import 'jest';
import { DataPoint } from '../../types';
import { LTTB } from '../LTTB';
import { makeTupleDateTestData, makeTupleNumberTestData, makeXYDateTestData, makeXYNumberTestData } from './utils';
import data from './testdata.json';

describe('LTTB', () => {
  describe('with XYDataPoint with Date', () => testMethod(makeXYDateTestData(data)));
  describe('with TupleDataPoint with Date', () => testMethod(makeTupleDateTestData(data)));
  describe('with XYDataPoint with number', () => testMethod(makeXYNumberTestData(data)));
  describe('with TupleDataPoint with number', () => testMethod(makeTupleNumberTestData(data)));

  function testMethod(data: DataPoint[]) {
    it('should throw an error if desiredLength is negative', () => {
      expect(() => LTTB(data, -1)).toThrow();
    });

    it('should return the whole data set if there are two data points', () => {
      expect(LTTB(data.slice(0, 2), 1)).toHaveLength(2);
    });

    it('should return the whole data set if desiredLength is larger than the data set length', () => {
      expect(LTTB(data, data.length + 40)).toHaveLength(data.length);
    });

    it('should return desired number of data points', () => {
      expect(LTTB(data, 3)).toHaveLength(3);
      expect(LTTB(data, 5)).toHaveLength(5);
      expect(LTTB(data, 7)).toHaveLength(7);
      expect(LTTB(data, 8)).toHaveLength(8);
    });

    it('should preserve the first and last data points', () => {
      expect(LTTB(data, 5)[0]).toEqual(data[0]);
      expect(LTTB(data, 5)[4]).toEqual(data[data.length - 1]);
    });

    it('should downsample larger date based data correctly', () => {
      expect(LTTB(data, 1)).toMatchSnapshot();
      expect(LTTB(data, 2)).toMatchSnapshot();
      expect(LTTB(data, 5)).toMatchSnapshot();
      expect(LTTB(data, 1000)).toMatchSnapshot();
      expect(LTTB(data, Math.round(data.length / 2))).toMatchSnapshot();
    });
  }
});
