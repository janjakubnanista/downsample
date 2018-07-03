import "mocha";
import expect from "expect.js";
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
    expect(() => LTOB(dateData, -1)).to.throwError();
  });

  it("should return the whole data set if there are two data points", () => {
    expect(LTOB(dateData.slice(0, 2), 1)).to.have.length(2);
  });

  it("should return the whole data set if desiredLength is larger than the data set length", () => {
    expect(LTOB(dateData, dateData.length + 40)).to.have.length(dateData.length);
  });

  it("should return desired number of data points", () => {
    expect(LTOB(dateData, 3)).to.have.length(3);
    expect(LTOB(dateData, 5)).to.have.length(5);
    expect(LTOB(dateData, 7)).to.have.length(7);
    expect(LTOB(dateData, 8)).to.have.length(8);
  });

  it("should preserve the first and last data points", () => {
    expect(LTOB(dateData, 5)[0]).to.be.eql(dateData[0]);
    expect(LTOB(dateData, 5)[4]).to.be.eql(dateData[dateData.length - 1]);
  });

  it("should downsample correctly", () => {
    expect(LTOB(dateData, 5)).to.be.eql([
      { x: new Date(635554800000), y: 0 },
      { x: new Date(635554800030), y: -1 },
      { x: new Date(635554800040), y: 10 },
      { x: new Date(635554800070), y: 23 },
      { x: new Date(635554800080), y: 1 }
    ]);
  });
});