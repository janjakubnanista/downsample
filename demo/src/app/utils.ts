import { XYDataPoint } from "../../../src/types";

const getRandomNumber = (lowerBound: number, upperBound: number): number => lowerBound + Math.random() * (upperBound - lowerBound);

export const generateRandomData = (length: number): XYDataPoint[] => {
  const data = [];

  let value: number = getRandomNumber(0, 100);
  for (let i: number = 0; i < length; i++) {
    value += getRandomNumber(-100, 100);

    data.push({ x: i, y: value });
  }

  return data;
};