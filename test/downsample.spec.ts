import 'jest';

import { ASAP, LTD, LTOB, LTTB, TupleDataPoint } from 'downsample';
import { ASAP as ASAP2 } from 'downsample/methods/ASAP';
import { LTD as LTD2 } from 'downsample/methods/LTD';
import { LTOB as LTOB2 } from 'downsample/methods/LTOB';
import { LTTB as LTTB2 } from 'downsample/methods/LTTB';
import downsample from 'downsample';

const NUMERIC_DATA = [1, 2, 3, 1, 5, 10, 15, 20];
const DATA_POINTS: TupleDataPoint[] = NUMERIC_DATA.map((value, index) => [index, value]);

describe('imports from root', () => {
  it('should have ASAP function', () => {
    expect(ASAP).toBeInstanceOf(Function);
    expect(ASAP(NUMERIC_DATA, 2)).toMatchSnapshot();
  });

  it('should have LTD function', () => {
    expect(LTD).toBeInstanceOf(Function);
    expect(LTD(DATA_POINTS, 0)).toMatchSnapshot();
  });

  it('should have LTOB function', () => {
    expect(LTOB).toBeInstanceOf(Function);
    expect(LTOB(DATA_POINTS, 0)).toMatchSnapshot();
  });

  it('should have LTTB function', () => {
    expect(LTTB).toBeInstanceOf(Function);
    expect(LTTB(DATA_POINTS, 0)).toMatchSnapshot();
  });
});

describe('default export', () => {
  it('should have ASAP function', () => {
    expect(downsample.ASAP).toBeInstanceOf(Function);
    expect(downsample.ASAP(NUMERIC_DATA, 2)).toMatchSnapshot();
  });

  it('should have LTD function', () => {
    expect(downsample.LTD).toBeInstanceOf(Function);
    expect(downsample.LTD(DATA_POINTS, 0)).toMatchSnapshot();
  });

  it('should have LTOB function', () => {
    expect(downsample.LTOB).toBeInstanceOf(Function);
    expect(downsample.LTOB(DATA_POINTS, 0)).toMatchSnapshot();
  });

  it('should have LTTB function', () => {
    expect(downsample.LTTB).toBeInstanceOf(Function);
    expect(downsample.LTTB(DATA_POINTS, 0)).toMatchSnapshot();
  });
});

describe('direct imports', () => {
  it('should have ASAP function', () => {
    expect(ASAP2).toBeInstanceOf(Function);
    expect(ASAP2([1, 10, 1, 10, 5], 2)).toMatchSnapshot();
  });

  it('should have LTD function', () => {
    expect(LTD2).toBeInstanceOf(Function);
    expect(LTD2(DATA_POINTS, 0)).toMatchSnapshot();
  });

  it('should have LTOB function', () => {
    expect(LTOB2).toBeInstanceOf(Function);
    expect(LTOB2(DATA_POINTS, 0)).toMatchSnapshot();
  });

  it('should have LTTB function', () => {
    expect(LTTB2).toBeInstanceOf(Function);
    expect(LTTB2(DATA_POINTS, 0)).toMatchSnapshot();
  });
});
