import { XYDataPoint } from '../../src/types';

const getRandomNumber = (lowerBound: number, upperBound: number): number =>
  lowerBound + Math.random() * (upperBound - lowerBound);

export const generateRandomData = (length: number, even = true): XYDataPoint[] => {
  let value: number = getRandomNumber(0, 100);
  let time = 0;
  const getTimeIncrement = even
    ? (index: number) => index
    : (index: number) => 1 + (1 + Math.sin((index / length) * 2 * Math.PI)) * length;

  return Array.from({ length }).map((_, index) => {
    value += getRandomNumber(-100, 100);
    time += getTimeIncrement(index);

    return { x: time, y: value };
  });
};
