# downsample

Collection of several downsampling methods for time series visualisation purposes.

[![Build Status](https://travis-ci.org/janjakubnanista/downsample.svg?branch=master)](https://travis-ci.org/janjakubnanista/downsample)

## Installation

[downsample](https://www.npmjs.com/package/downsample) is an NPM module. Install using

```
  npm install downsample
```

## Usage

Two downsampling methods are currently supported, description of both can be found [here](https://skemman.is/bitstream/1946/15343/3/SS_MSthesis.pdf):

- Largest triangle three buckets (LTTB)
- Largest triangle one bucket (LTOB)

Downsampling a series of data points using either of these looks like this:

```typescript
// ES6
import { LTOB, LTTB } from "downsample";

// Or old school
var LTOB = require("downsample").LTOB;
var LTTB = require("downsample").LTTB;

// The number of target data points, 100 for example
const numPointsInDownsampledData: number = 100;

// See the API docs for supported input data formats
const data: DataPoint[] = [ ... ];
const downsampledDataLTOB: DataPoint[] = LTOB(data, numPointsInDownsampledData);

// downsampledDataLTOB now contains data downsampled to contain 
// no more than numPointsInDownsampledData data points.
//
// the output data format matches the input one and data points are copied
// shallowly to the resulting array
```

## API

### DataPoint type

Represents a data point in the input data array. Two formats are currently supported:

`TupleDataPoint` is an array tuple of a `number` or a `Date` representing 
the independent variable (e.g. time) and a `number` representing the value:

```typescript
const numericTupleDataPoint: TupleDataPoint = [1, 152.2];

const dateTupleDataPoint: TupleDataPoint = [new Date(), 45.1];
```

`XYDataPoint` is an object hash with `x` property representing 
the independent variable (e.g. time) and an `y` property the value:

```typescript
const numericXYDataPoint: XYDataPoint = { x: 1, y: 152.2 };

const dateXYDataPoint: XYDataPoint = { x: new Date(), y: 152.2 };
```

### downsample.LTOB&lt;T extends DataPoint&gt;(data: T[], desiredLength: number): T[]

Implementation of `Largest triangle one bucket` downsampling method.

`data: DataPoint[]` is the input array. This array should be sorted by the independent variable
otherwise the results will be unpredictable.

`desiredLength: number` is the length of the downsampled array.

This function will throw an error if the `desiredLength` is negative.

### downsample.LTTB&lt;T extends DataPoint&gt;(data: T[], desiredLength: number): T[]

Implementation of `Largest triangle three buckets` downsampling method.

`data: DataPoint[]` is the input array. This array should be sorted by the independent variable
otherwise the results will be unpredictable.

`desiredLength: number` is the length of the downsampled array.

This function will throw an error if the `desiredLength` is negative.
