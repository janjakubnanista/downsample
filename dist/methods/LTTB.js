"use strict";
exports.__esModule = true;
var utils_1 = require("../utils");
// Largest triangle three buckets data downsampling algorithm implementation
function LTTB(data, desiredLength) {
    if (desiredLength < 0) {
        throw new Error("Supplied negative desiredLength parameter to LTTB: " + desiredLength);
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
    var lastSelectedDataPoint = normalizedData[0];
    for (var bucket = 1; bucket < desiredLength - 1; bucket++) {
        var bucketStartIndex = bucket * bucketSize;
        var nextBucketStartIndex = Math.min(length - 1, (bucket + 1) * bucketSize);
        var nextBucketEndIndex = Math.min(length - 1, (bucket + 2) * bucketSize) + 1;
        var dataPointsInNextBucket = normalizedData.slice(nextBucketStartIndex, nextBucketEndIndex);
        var averageDataPointFromNextBucket = utils_1.calculateAverageDataPoint.apply(void 0, dataPointsInNextBucket);
        var maxArea = -1;
        var maxAreaIndex = -1;
        for (var j = bucketStartIndex; j < nextBucketStartIndex; j++) {
            var dataPoint = normalizedData[j];
            var area = utils_1.calculateTriangleArea(lastSelectedDataPoint, dataPoint, averageDataPointFromNextBucket);
            if (area > maxArea) {
                maxArea = area;
                maxAreaIndex = j;
            }
        }
        lastSelectedDataPoint = normalizedData[maxAreaIndex];
        sampledData.push(data[maxAreaIndex]);
    }
    sampledData.push(data[length - 1]);
    return sampledData;
}
exports["default"] = LTTB;
