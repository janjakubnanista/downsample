import 'jest';
import { NormalizedDataPoint } from './types';
import { calculateAverageDataPoint, calculateTriangleArea, splitIntoBuckets } from './utils';

describe('utils', () => {
  describe('calculateTriangleArea', () => {
    it('should return 0 for a collapsed triangle', () => {
      const pointA: NormalizedDataPoint = [1, 2];
      const pointB: NormalizedDataPoint = [2, 2];
      const pointC: NormalizedDataPoint = [3, 2];

      expect(calculateTriangleArea(pointA, pointB, pointC)).toBe(0);
    });

    it('should return correct area for a triangle aligned with an axis', () => {
      const pointA: NormalizedDataPoint = [1, 0];
      const pointB: NormalizedDataPoint = [2, 5];
      const pointC: NormalizedDataPoint = [3, 0];

      expect(calculateTriangleArea(pointA, pointB, pointC)).toBe(5);
    });

    it('should return correct area for a triangle not aligned with an axis', () => {
      const pointA: NormalizedDataPoint = [1, 2];
      const pointB: NormalizedDataPoint = [2, 5];
      const pointC: NormalizedDataPoint = [3, 5];

      expect(calculateTriangleArea(pointA, pointB, pointC)).toBe(1.5);
    });

    it('should return correct area for a triangle covering negative quadrants', () => {
      const pointA: NormalizedDataPoint = [-1, -1];
      const pointB: NormalizedDataPoint = [0, 1];
      const pointC: NormalizedDataPoint = [1, -1];

      expect(calculateTriangleArea(pointA, pointB, pointC)).toBe(2);
    });
  });

  describe('calculateAverageDataPoint', () => {
    it('should return undefined when passed no data points', () => {
      expect(calculateAverageDataPoint()).toBe(undefined);
    });

    it('should return the same point when passed one data point', () => {
      expect(calculateAverageDataPoint([0, 1])).toEqual([0, 1]);
    });

    it('should return correct point average', () => {
      const pointA: NormalizedDataPoint = [-1, -1];
      const pointB: NormalizedDataPoint = [0, 2];
      const pointC: NormalizedDataPoint = [1, -1];

      expect(calculateAverageDataPoint(pointA, pointB, pointC)).toEqual([0, 0]);
    });
  });

  describe('spliIntoBuckets', () => {
    const data: [number, number][] = [
      [0, 2],
      [1, -1],
      [2, 2],
      [3, -1],
      [4, 2],
      [5, -1],
      [6, 2],
      [7, -1],
    ];

    it('should return two buckets with one data point each when passed two data points', () => {
      expect(
        splitIntoBuckets(
          [
            [0, 2],
            [1, -1],
          ],
          2,
        ),
      ).toEqual([[[0, 2]], [[1, -1]]]);
    });

    it('should return an array of desired length', () => {
      expect(splitIntoBuckets(data, 2)).toHaveLength(2);
      expect(splitIntoBuckets(data, 3)).toHaveLength(3);
      expect(splitIntoBuckets(data, 4)).toHaveLength(4);
      expect(splitIntoBuckets(data, 5)).toHaveLength(5);
    });

    it('should return an array with the first and the last bucket containing the first and the last data points', () => {
      expect(splitIntoBuckets(data, 3)[0]).toHaveLength(1);
      expect(splitIntoBuckets(data, 3)[0]).toEqual([[0, 2]]);
      expect(splitIntoBuckets(data, 3)[2]).toHaveLength(1);
      expect(splitIntoBuckets(data, 3)[2]).toEqual([[7, -1]]);
    });
  });
});
