import "mocha";
import expect from "expect.js";
import { NormalizedDataPoint } from "./types";
import { calculateTriangleArea, calculateAverageDataPoint, splitIntoBuckets } from "./utils";

describe("utils", () => {
  describe("calculateTriangleArea", () => {
    it("should return 0 for a collapsed triangle", () => {
      const pointA: NormalizedDataPoint = [1, 2];
      const pointB: NormalizedDataPoint = [2, 2];
      const pointC: NormalizedDataPoint = [3, 2];

      expect(calculateTriangleArea(pointA, pointB, pointC)).to.be(0);
    });

    it("should return correct area for a triangle aligned with an axis", () => {
      const pointA: NormalizedDataPoint = [1, 0];
      const pointB: NormalizedDataPoint = [2, 5];
      const pointC: NormalizedDataPoint = [3, 0];

      expect(calculateTriangleArea(pointA, pointB, pointC)).to.be(5);
    });

    it("should return correct area for a triangle not aligned with an axis", () => {
      const pointA: NormalizedDataPoint = [1, 2];
      const pointB: NormalizedDataPoint = [2, 5];
      const pointC: NormalizedDataPoint = [3, 5];

      expect(calculateTriangleArea(pointA, pointB, pointC)).to.be(1.5);
    });

    it("should return correct area for a triangle covering negative quadrants", () => {
      const pointA: NormalizedDataPoint = [-1, -1];
      const pointB: NormalizedDataPoint = [0, 1];
      const pointC: NormalizedDataPoint = [1, -1];

      expect(calculateTriangleArea(pointA, pointB, pointC)).to.be(2);
    });
  });

  describe("calculateAverageDataPoint", () => {
    it("should return undefined when passed no data points", () => {
      expect(calculateAverageDataPoint()).to.be(undefined);
    });

    it("should return the same point when passed one data point", () => {
      expect(calculateAverageDataPoint([0, 1])).to.eql([0, 1]);
    });

    it("should return correct point average", () => {
      const pointA: NormalizedDataPoint = [-1, -1];
      const pointB: NormalizedDataPoint = [0, 2];
      const pointC: NormalizedDataPoint = [1, -1];

      expect(calculateAverageDataPoint(pointA, pointB, pointC)).to.eql([0, 0]);
    });
  });

  describe("spliIntoBuckets", () => {
    const data: [number, number][] = [
      [0, 2],
      [1, -1],
      [2, 2],
      [3, -1],
      [4, 2],
      [5, -1],
      [6, 2],
      [7, -1]
    ];

    it("should return two buckets with one data point each when passed two data points", () => {
      expect(splitIntoBuckets([
        [0, 2],
        [1, -1]
      ], 2)).to.eql([
        [
          [0, 2]
        ],
        [
          [1, -1]
        ]
      ]);
    });

    it("should return an array of desired length", () => {
      expect(splitIntoBuckets(data, 2)).to.have.length(2);
      expect(splitIntoBuckets(data, 3)).to.have.length(3);
      expect(splitIntoBuckets(data, 4)).to.have.length(4);
      expect(splitIntoBuckets(data, 5)).to.have.length(5);
    });

    it("should return an array with the first and the last bucket containing the first and the last data points", () => {
      expect(splitIntoBuckets(data, 3)[0]).to.have.length(1);
      expect(splitIntoBuckets(data, 3)[0]).to.eql([[0, 2]]);
      expect(splitIntoBuckets(data, 3)[2]).to.have.length(1);
      expect(splitIntoBuckets(data, 3)[2]).to.eql([[7, -1]]);
    });
  });
});