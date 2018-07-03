"use strict";
exports.__esModule = true;
var utils_1 = require("../utils");
// Largest triangle three buckets data downsampling algorithm implementation
function LTOB(data, desiredLength) {
    if (desiredLength < 0) {
        throw new Error("Supplied negative desiredLength parameter to LTOB: " + desiredLength);
    }
    var length = data.length;
    if (length <= 1 || length <= desiredLength) {
        return data;
    }
    // Now we are sure that:
    //
    // - length is [2, Infinity)
    // - threshold is (length, Inifnity)
    var bucketSize = Math.ceil(length / desiredLength);
    var normalizedData = utils_1.normalizeDataPoints(data);
    var sampledData = [data[0]];
    for (var bucket = 1; bucket < desiredLength - 1; bucket++) {
        var startIndex = bucket * bucketSize;
        var endIndex = Math.min(length - 1, (bucket + 1) * bucketSize);
        var maxArea = -1;
        var maxAreaIndex = -1;
        for (var j = startIndex; j < endIndex; j++) {
            var previousDataPoint = normalizedData[j - 1];
            var dataPoint = normalizedData[j];
            var nextDataPoint = normalizedData[j + 1];
            var area = utils_1.calculateTriangleArea(previousDataPoint, dataPoint, nextDataPoint);
            if (area > maxArea) {
                maxArea = area;
                maxAreaIndex = j;
            }
        }
        sampledData.push(data[maxAreaIndex]);
    }
    sampledData.push(data[length - 1]);
    return sampledData;
}
exports["default"] = LTOB;
