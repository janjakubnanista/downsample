"use strict";
exports.__esModule = true;
var isTupleDataPoint = function (dataPoint) {
    return Array.isArray(dataPoint);
};
var isXYDataPoint = function (dataPoint) {
    return !!dataPoint && "x" in dataPoint && "y" in dataPoint;
};
var normalizeX = function (x) { return x instanceof Date ? x.getTime() : x; };
function normalizeDataPoint(dataPoint) {
    if (!dataPoint)
        return undefined;
    if (isXYDataPoint(dataPoint)) {
        return [normalizeX(dataPoint.x), dataPoint.y];
    }
    if (isTupleDataPoint(dataPoint)) {
        return [normalizeX(dataPoint[0]), dataPoint[1]];
    }
    throw new Error("Invalid data point format supplied: " + JSON.stringify(dataPoint));
}
exports.normalizeDataPoint = normalizeDataPoint;
function normalizeDataPoints(dataPoints) {
    return dataPoints.map(normalizeDataPoint);
}
exports.normalizeDataPoints = normalizeDataPoints;
function calculateTriangleArea(pointA, pointB, pointC) {
    return Math.abs((pointA[0] - pointC[0]) * (pointB[1] - pointA[1]) - (pointA[0] - pointB[0]) * (pointC[1] - pointA[1])) / 2;
}
exports.calculateTriangleArea = calculateTriangleArea;
function calculateAverageDataPoint() {
    var points = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        points[_i] = arguments[_i];
    }
    var length = points.length;
    if (!length)
        return undefined;
    var averageX = 0;
    var averageY = 0;
    for (var i = 0; i < length; i++) {
        averageX += points[i][0];
        averageY += points[i][1];
    }
    return [averageX / length, averageY / length];
}
exports.calculateAverageDataPoint = calculateAverageDataPoint;
