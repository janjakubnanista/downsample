# downsample

Collection of several downsampling methods for time series visualisation purposes.

[![Build Status](https://travis-ci.org/janjakubnanista/downsample.svg?branch=master)](https://travis-ci.org/janjakubnanista/downsample)

## Demo

There is a very minimal interactive demo app available if you want to play around with the results of downsampling. [Check it out here](https://janjakubnanista.github.io/downsample/).

## Installation

[downsample](https://www.npmjs.com/package/downsample) is an NPM module. Install using

```
  npm install downsample
```

## Acknowledgement

The implementation is based on Sveinn Steinarsson's 2013 paper _Downsampling Time Series for
Visual Representation_ that can be found [here](https://skemman.is/bitstream/1946/15343/3/SS_MSthesis.pdf).

## Usage

Three downsampling methods are currently supported, description of all three can be found [here](https://skemman.is/bitstream/1946/15343/3/SS_MSthesis.pdf):

- Largest triangle three buckets (LTTB)
- Largest triangle one bucket (LTOB)
- Largest triangle dynamic (LTD)

Downsampling a series of data points using either of these looks like this:

```typescript
// ES6
import { LTD, LTOB, LTTB } from "downsample";

// Or old school
var LTD = require("downsample").LTD;
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

### downsample.LTD&lt;T extends DataPoint&gt;(data: T[], desiredLength: number): T[]

Implementation of `Largest triangle dynamic` downsampling method. Especially good for unevenly sampled data, for evenly spaced data `LTTB` should produce better results.

`data: DataPoint[]` is the input array. This array should be sorted by the independent variable
otherwise the results will be unpredictable.

`desiredLength: number` is the length of the downsampled array.

This function will throw an error if the `desiredLength` is negative.
