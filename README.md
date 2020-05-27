<h1 align="center">
  downsample
</h1>

<p align="center">
  Downsampling methods for time series visualisation.
</p>

<!-- The badges section -->
<p align="center">
  <!-- Travis CI build status -->
  <a href="https://travis-ci.org/janjakubnanista/downsample"><img alt="Build Status" src="https://travis-ci.org/janjakubnanista/downsample.svg?branch=master"/></a>
  <!-- Fury.io NPM published package version -->
  <a href="https://www.npmjs.com/package/downsample"><img alt="NPM Version" src="https://badge.fury.io/js/downsample.svg"/></a>
  <!-- Shields.io dev dependencies status -->
  <a href="https://github.com/janjakubnanista/downsample/blob/master/package.json"><img alt="Dev Dependency Status" src="https://img.shields.io/david/dev/janjakubnanista/downsample"/></a>
  <!-- Snyk.io vulnerabilities badge -->
  <a href="https://snyk.io/test/github/janjakubnanista/downsample"><img alt="Known Vulnerabilities" src="https://snyk.io/test/github/janjakubnanista/downsample/badge.svg"/></a>
  <!-- Shields.io license badge -->
  <a href="https://github.com/janjakubnanista/downsample/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/downsample"/></a>
</p>

<p align="center">
  <a href="#installation">Installation</a>
  <span>|</span>
  <a href="#usage">Usage</a>
  <span>|</span>
  <a href="#api">API</a>
  <span>|</span>
  <a href="#demo">Demo</a>
  <span>|</span>
  <a href="#acknowledgement">Acknowledgement</a>
</p>

`downsample` is useful when, not extremely surprisingly, you need to downsample a numeric time series before visualizing it without losing the visual characteristics of the data.

<a id="installation"></a>
## Installation

[downsample](https://www.npmjs.com/package/downsample) is an NPM module. You can easily download it by typing something like the following in your project:

```bash
# for all the npm people out there
npm install downsample

# or if you are a fan of yarn
yarn add downsample
```

<a id="usage"></a>
## Usage

The package exports several methods for data downsampling:

- **ASAP** Automatic Smoothing for Attention Prioritization [read more here](http://futuredata.stanford.edu/asap/)
- **SMA** Simple moving average [read more here](https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average)
- **LTTB** Largest triangle three buckets [read more here](https://skemman.is/bitstream/1946/15343/3/SS_MSthesis.pdf)
- **LTOB** Largest triangle one bucket [read more here](https://skemman.is/bitstream/1946/15343/3/SS_MSthesis.pdf)
- **LTD** Largest triangle dynamic [read more here](https://skemman.is/bitstream/1946/15343/3/SS_MSthesis.pdf)

You can read more about the details of these in the [API](#api) section below.

<a id="api"></a>
## API

### `ASAP` :boom: *new in 1.2.0* :boom:

Automatic Smoothing for Attention Prioritization ([read more here](http://futuredata.stanford.edu/asap/)) is a smoothing rather than downsampling method - it will remove the short-term noise and reveal the large-scale deviations.

`ASAP` accepts an array of data points (see [DataPoint](#api/DataPoint)) and a target resolution (number of output data points) as arguments.

```typescript
function ASAP(data: DataPoint[], targetResolution: number): number[]
```

```typescript
import { ASAP } from 'downsample';

// Or if your codebase does not supprot tree-shaking
import { ASAP } from 'downsample/methods/ASAP';

const chartWidth = 1000;
const smooth = ASAP([
  [0, 1000],
  [1, 1243],
  // ...
], chartWidth);
```

### `SMA` :boom: *new in 1.2.0* :boom:

Simple moving average with variable slide ([read more here](https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average)).

`SMA` accepts an array of data points (see [DataPoint](#api/DataPoint)), size of a window over which to calculate average and a slide - an amount by which the window is shifted.

```typescript
function SMA(data: DataPoint[], windowSize: number, slide?: number = 1): number[]
```

```typescript
import { SMA } from 'downsample';

// Or if your codebase does not supprot tree-shaking
import { SMA } from 'downsample/methods/SMA';

const chartWidth = 1000;
const smooth = SMA([
  [0, 1000],
  [1, 1243],
  // ...
], chartWidth);
```

### `LTTB`

Largest triangle three buckets ([read more here](https://skemman.is/bitstream/1946/15343/3/SS_MSthesis.pdf)). If you are looking for the best performing method then look no more!

```typescript
function LTTB(data: DataPoint[], targetResolution: number): DataPoint[]
```

`LTTB` accepts an array of data points (see [DataPoint](#api/DataPoint)) and a target resolution (number of output data points) as arguments.

The format of the data will be preserved, i.e. if passing an array of `[number, number]` data points as `data`, you will get an array of `[number, number]` on the output.

```typescript
import { LTTB } from 'downsample';

// Or if your codebase does not supprot tree-shaking
import { LTTB } from 'downsample/methods/LTTB';

const chartWidth = 1000;
const downsampled = LTTB([
  [0, 1000],
  [1, 1243],
  // ...
], chartWidth);
```

### `LTOB`

Largest triangle one bucket ([read more here](https://skemman.is/bitstream/1946/15343/3/SS_MSthesis.pdf)). Performs only slightly worse than LTTB.

```typescript
function LTOB(data: DataPoint[], targetResolution: number): DataPoint[]
```

`LTOB` accepts an array of data points (see [DataPoint](#api/DataPoint)) and a target resolution (number of output data points) as arguments.

The format of the data will be preserved, i.e. if passing an array of `[number, number]` data points as `data`, you will get an array of `[number, number]` on the output.

```typescript
import { LTOB } from 'downsample';

// Or if your codebase does not supprot tree-shaking
import { LTOB } from 'downsample/methods/LTOB';

const chartWidth = 1000;
const downsampled = LTOB([
  [0, 1000],
  [1, 1243],
  // ...
], chartWidth);
```

### `LTD`

Largest triangle dynamic ([read more here](https://skemman.is/bitstream/1946/15343/3/SS_MSthesis.pdf)). The simplest downsampling method.

```typescript
function LTD(data: DataPoint[], targetResolution: number): DataPoint[]
```

`LTD` accepts an array of data points (see [DataPoint](#api/DataPoint)) and a target resolution (number of output data points) as arguments.

The format of the data will be preserved, i.e. if passing an array of `[number, number]` data points as `data`, you will get an array of `[number, number]` on the output.

```typescript
import { LTD } from 'downsample';

// Or if your codebase does not supprot tree-shaking
import { LTD } from 'downsample/methods/LTD';

const chartWidth = 1000;
const downsampled = LTD([
  [0, 1000],
  [1, 1243],
  // ...
], chartWidth);
```

<a id="api/DataPoint"></a>
### `DataPoint` type

Represents a data point in the input data array. These formats are currently supported:

```typescript
type DataPoint = 
  [number, number] | 
  [Date, number] | 
  { x: number; y: number } |
  { x: Date; y: number } |
```

<a id="demo"></a>
## Demo

There is a very minimal interactive demo app available if you want to play around with the results of downsampling. [Check it out here](https://janjakubnanista.github.io/downsample/).

<a id="acknowledgement"></a>
## Acknowledgement

The implementation of `LTD`, `LTOB` and `LTTB` is based on Sveinn Steinarsson's 2013 paper _Downsampling Time Series for
Visual Representation_ that can be found [here](https://skemman.is/bitstream/1946/15343/3/SS_MSthesis.pdf).

The implementation of `ASAP` is based on Kexin Rong's and Peter Bailis's 2017 paper. _ASAP: Prioritizing Attention via Time Series Smoothing_ that can be found [here](https://arxiv.org/pdf/1703.00983.pdf). The original code can be found [here](https://github.com/stanford-futuredata/ASAP/blob/master/ASAP-optimized.js)