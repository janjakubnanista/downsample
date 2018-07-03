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

```
// ES6
import { LTOB, LTTB } from "downsample";

// Or old school
var LTOB = require("downsample").LTOB;
var LTTB = require("downsample").LTTB;

// The number of target data points, 100 for example
const numPointsInDownsampledData = 100;

// See the API docs for supported input data formats
const data = [ ... ];
const downsampledDataLTOB = LTOB(data, numPointsInDownsampledData);

// downsampledDataLTOB now contains data downsampled to contain 
// no more than numPointsInDownsampledData data points.
//
// the output data format matches the input one and data points are copied
// shallowly to the resulting array
```

## API

*Work in progress, please see src/methods/LTOB.ts for a simple TypeScript API*
