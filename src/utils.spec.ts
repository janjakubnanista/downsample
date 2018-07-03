import "mocha";
import expect from "expect.js";
import { NormalizedDataPoint } from "./types";
import { calculateTriangleArea, calculateAverageDataPoint } from "./utils";

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
});