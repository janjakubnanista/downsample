import 'jest';
import { ASAP } from '../ASAP';
import { DataPoint, TupleDataPoint } from '../../types';
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

  describe('with XYDataPoint with Date', () => testMethod(makeXYDateTestData(data)));
  describe('with TupleDataPoint with Date', () => testMethod(makeTupleDateTestData(data)));
  describe('with XYDataPoint with number', () => testMethod(makeXYNumberTestData(data)));
  describe('with TupleDataPoint with number', () => testMethod(makeTupleNumberTestData(data)));

  function testMethod(data: DataPoint[]) {
    it('should throw an error if desiredLength is negative', () => {
      expect(() => ASAP(data, -1)).toThrow();
    });

    it('should throw an error if desiredLength is zero', () => {
      expect(() => ASAP(data, 0)).toThrow();
    });

    [];

    it('should return desired number of data points', () => {
      expect(ASAP(data, 3)).toHaveLength(3);
      expect(ASAP(data, 5)).toHaveLength(5);
      expect(ASAP(data, 7)).toHaveLength(7);
      expect(ASAP(data, 8)).toHaveLength(8);
    });

    it('should downsample correctly', () => {
      expect(ASAP(data, 1)).toMatchSnapshot();
      expect(ASAP(data, 2)).toMatchSnapshot();
      expect(ASAP(data, 5)).toMatchSnapshot();
      expect(ASAP(data, 100)).toMatchSnapshot();
      expect(ASAP(data, 1000)).toMatchSnapshot();
      expect(ASAP(data, Math.round(data.length / 2))).toMatchSnapshot();
    });
  }
});
