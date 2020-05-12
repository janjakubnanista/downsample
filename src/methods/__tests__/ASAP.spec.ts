import 'jest';
import { ASAP } from '../ASAP';
import data from './testdata.json';

describe('ASAP', () => {
  it('should throw an error if desiredLength is negative', () => {
    expect(() => ASAP(data, -1)).toThrow();
  });

  it('should return the whole data set if desiredLength is larger than the data set length', () => {
    expect(ASAP(data, data.length + 40)).toHaveLength(data.length);
  });

  it('should return desired number of data points', () => {
    expect(ASAP(data, 3)).toHaveLength(3);
    expect(ASAP(data, 5)).toHaveLength(5);
    expect(ASAP(data, 7)).toHaveLength(7);
    expect(ASAP(data, 8)).toHaveLength(8);
  });

  it('should downsample correctly', () => {
    expect(ASAP(data, 1)).toMatchSnapshot();
    expect(ASAP(data, 2)).toMatchSnapshot();
    expect(ASAP(data, 5)).toMatchSnapshot();
    expect(ASAP(data, 100)).toMatchSnapshot();
    expect(ASAP(data, 1000)).toMatchSnapshot();
    expect(ASAP(data, Math.round(data.length / 2))).toMatchSnapshot();
  });
});
