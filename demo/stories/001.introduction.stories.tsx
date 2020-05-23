import { Aux, Banner } from './components/typography';
import LinkTo from '@storybook/addon-links/dist/react';
import React from 'react';

export default {
  title: 'Downsample',
};

export const Welcome = () => {
  return (
    <>
      <h1>Welcome to Downsample</h1>

      <Banner>
        This is an interactive showcase of <code>downsample</code> package functionality. You can find the API
        documentation <a href="https://github.com/janjakubnanista/downsample">here</a>.
      </Banner>

      <p>
        <code>downsample</code> NPM package is a JavaScript / TypeScript toolbox for projects that need to display or
        process more data than would be ideal. It exposes several functions that can:
      </p>

      <ul>
        <li>
          <strong>Simplify</strong> the data, reducing the amount of data points while preserving the visual
          &quot;shape&quot; of the data as close to the original as possible
        </li>
        <li>
          <strong>Smooth</strong> the data, reducing the short-term noise and revealing the underlying long-term trends
        </li>
      </ul>

      <p>
        You can compare the results of applying the methods to{' '}
        <LinkTo kind="Comparison" story="With Random Data">
          randomly generated data
        </LinkTo>{' '}
        or{' '}
        <LinkTo kind="Comparison" story="With Periodic Data">
          data with strong periodicity
        </LinkTo>
      </p>

      <h2>Simplifying data</h2>
      <p>
        These methods pick data points out of the original data so that the &apos;shape&apos; of the data is preserved.
        The output data points thus copied by reference from the input array.
      </p>

      <ul>
        <li>
          <strong>LTD</strong> <Aux>(Largest triangle dynamic)</Aux> is the simplest, worst performing one.
        </li>
        <li>
          <strong>LTOB</strong> <Aux>(Largest triangle one bucket)</Aux> is an improvement over LTD
        </li>
        <li>
          <strong>LTTB</strong> <Aux>(Largest triangle three buckets)</Aux> is the most performant one, especially when
          downsampling data that is not evenly distributed
        </li>
      </ul>

      <h2>Smoothing data</h2>
      <p>
        These will create new data points in order to smooth the input data with various degree of detail preservation.
      </p>

      <ul>
        <li>
          <strong>SMA</strong> <Aux>(Simple moving average)</Aux> is a very basic smoothing method that will generally
          not preserve a lot of data characteristics, (smoothing out the data uniformly).
        </li>
        <li>
          <strong>ASAP</strong> <Aux>(Automatic Smoothing for Attention Prioritization)</Aux> is an advanced smoothing
          method, limited to evenly distributed data though. It will preserve the interesting data characteristics
          (removing the short term noise while keeping the long term trends).
        </li>
      </ul>
    </>
  );
};

Welcome.story = {
  name: 'Introduction',
};

export const Links = () => {
  return (
    <>
      <h1>Useful links</h1>

      <ul>
        <li>
          <a href="https://github.com/janjakubnanista/downsample">Github repo</a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/downsample">NPM package</a>
        </li>
        <li>
          <a href="https://skemman.is/bitstream/1946/15343/3/SS_MSthesis.pdf">
            Sveinn Steinarsson&apos;s 2013 paper <em>Downsampling Time Series for Visual Representation</em>
          </a>
        </li>
        <li>
          <a href="https://arxiv.org/pdf/1703.00983.pdf">
            Kexin Rong&apos;s and Peter Bailis&apos;s 2017 paper
            <em>ASAP: Prioritizing Attention via Time Series Smoothing</em>
          </a>
          <br />
          <a href="https://github.com/stanford-futuredata/ASAP/blob/master/ASAP-optimized.js">
            [the original source code]
          </a>
        </li>
      </ul>
    </>
  );
};

Links.story = {
  name: 'Links',
};
