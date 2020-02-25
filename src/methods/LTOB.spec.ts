import "jest";
import LTOB from "./LTOB";
import { DataPoint } from "../types";

describe("LTOB", () => {
  const dateData: DataPoint[] = [
    { x: new Date(635554800000), y: 0 },
    { x: new Date(635554800010), y: 1 },
    { x: new Date(635554800020), y: 2 },
    { x: new Date(635554800030), y: -1 },
    { x: new Date(635554800040), y: 10 },
    { x: new Date(635554800050), y: 6 },
    { x: new Date(635554800060), y: 4 },
    { x: new Date(635554800070), y: 23 },
    { x: new Date(635554800080), y: 1 }
  ];

  it("should throw an error if desiredLength is negative", () => {
    expect(() => LTOB(dateData, -1)).toThrow();
  });

  it("should return the whole data set if there are two data points", () => {
    expect(LTOB(dateData.slice(0, 2), 1)).toHaveLength(2);
  });

  it("should return the whole data set if desiredLength is larger than the data set length", () => {
    expect(LTOB(dateData, dateData.length + 40)).toHaveLength(dateData.length);
  });

  it("should return desired number of data points", () => {
    expect(LTOB(dateData, 3)).toHaveLength(3);
    expect(LTOB(dateData, 5)).toHaveLength(5);
    expect(LTOB(dateData, 7)).toHaveLength(7);
    expect(LTOB(dateData, 8)).toHaveLength(8);
  });

  it("should preserve the first and last data points", () => {
    expect(LTOB(dateData, 5)[0]).toEqual(dateData[0]);
    expect(LTOB(dateData, 5)[4]).toEqual(dateData[dateData.length - 1]);
  });

  it("should downsample correctly", () => {
    expect(LTOB(dateData, 5)).toEqual([
      { x: new Date(635554800000), y: 0 },
      { x: new Date(635554800030), y: -1 },
      { x: new Date(635554800040), y: 10 },
      { x: new Date(635554800070), y: 23 },
      { x: new Date(635554800080), y: 1 }
    ]);
  });
});