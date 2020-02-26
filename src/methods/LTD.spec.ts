import "jest";
import LTD from "./LTD";
import { DataPoint } from "../types";

describe("LTD", () => {
  const dateData: DataPoint[] = [
    { x: new Date(635554800000), y: 0 },
    { x: new Date(635554800080), y: 10 },
    { x: new Date(635554800090), y: 23 },
    { x: new Date(635554800100), y: 20 },
    { x: new Date(635554800110), y: 21 },
    { x: new Date(635554800120), y: 6 },
    { x: new Date(635554800130), y: 19 },
    { x: new Date(635554800140), y: 20 },
    { x: new Date(635554800141), y: 18 },
    { x: new Date(635554800142), y: 21 },
    { x: new Date(635554800143), y: 19 },
    { x: new Date(635554800144), y: 20 }
  ];

  it("should throw an error if desiredLength is negative", () => {
    expect(() => LTD(dateData, -1)).toThrow();
  });

  it("should return the whole data set if there are two data points", () => {
    expect(LTD(dateData.slice(0, 2), 1)).toHaveLength(2);
  });

  it("should return the whole data set if desiredLength is larger than the data set length", () => {
    expect(LTD(dateData, dateData.length + 40)).toHaveLength(dateData.length);
  });

  it("should return desired number of data points", () => {
    expect(LTD(dateData, 3)).toHaveLength(3);
    expect(LTD(dateData, 5)).toHaveLength(5);
    expect(LTD(dateData, 7)).toHaveLength(7);
    expect(LTD(dateData, 8)).toHaveLength(8);
  });

  it("should preserve the first and last data points", () => {
    expect(LTD(dateData, 5)[0]).toEqual(dateData[0]);
    expect(LTD(dateData, 5)[4]).toEqual(dateData[dateData.length - 1]);
  });

  it("should downsample correctly", () => {
    expect(LTD(dateData, 5)).toEqual([
      { x: new Date(635554800000), y: 0 },
      { x: new Date(635554800090), y: 23 },
      { x: new Date(635554800120), y: 6 },
      { x: new Date(635554800140), y: 20 },
      { x: new Date(635554800144), y: 20 }
    ]);
  });
});