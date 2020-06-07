import 'jest';

import {
  ASAP,
  LTD,
  LTOB,
  LTTB,
  SMA,
  TupleDataPoint,
  createASAP,
  createLTD,
  createLTOB,
  createLTTB,
  createSMA,
} from 'downsample';
import { ASAP as ASAP2, createASAP as createASAP2 } from 'downsample/methods/ASAP';
import { LTD as LTD2, createLTD as createLTD2 } from 'downsample/methods/LTD';
import { LTOB as LTOB2, createLTOB as createLTOB2 } from 'downsample/methods/LTOB';
import { LTTB as LTTB2, createLTTB as createLTTB2 } from 'downsample/methods/LTTB';
import { SMA as SMA2, createSMA as createSMA2 } from 'downsample/methods/SMA';
import downsample from 'downsample';

const NUMERIC_DATA = [1, 2, 3, 1, 5, 10, 15, 20];
const DATA_POINTS: TupleDataPoint[] = NUMERIC_DATA.map((value, index) => [index, value]);

describe('imports from root', () => {
  it('should have ASAP function', () => {
    expect(ASAP).toBeInstanceOf(Function);
    expect(ASAP(DATA_POINTS, 2)).toMatchSnapshot();
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

  it('should have SMA function', () => {
    expect(SMA).toBeInstanceOf(Function);
    expect(SMA(DATA_POINTS, 1)).toMatchSnapshot();
  });

  it('should have createASAP function', () => {
    expect(createASAP).toBeInstanceOf(Function);
  });

  it('should have createLTD function', () => {
    expect(createLTD).toBeInstanceOf(Function);
  });

  it('should have createLTOB function', () => {
    expect(createLTOB).toBeInstanceOf(Function);
  });

  it('should have createLTTB function', () => {
    expect(createLTTB).toBeInstanceOf(Function);
  });

  it('should have createSMA function', () => {
    expect(createSMA).toBeInstanceOf(Function);
  });
});

describe('default export', () => {
  it('should have ASAP function', () => {
    expect(downsample.ASAP).toBeInstanceOf(Function);
    expect(downsample.ASAP(DATA_POINTS, 2)).toMatchSnapshot();
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

  it('should have SMA function', () => {
    expect(downsample.SMA).toBeInstanceOf(Function);
    expect(downsample.SMA(DATA_POINTS, 1)).toMatchSnapshot();
  });

  it('should have createASAP function', () => {
    expect(downsample.createASAP).toBeInstanceOf(Function);
  });

  it('should have createLTD function', () => {
    expect(downsample.createLTD).toBeInstanceOf(Function);
  });

  it('should have createLTOB function', () => {
    expect(downsample.createLTOB).toBeInstanceOf(Function);
  });

  it('should have createLTTB function', () => {
    expect(downsample.createLTTB).toBeInstanceOf(Function);
  });

  it('should have createSMA function', () => {
    expect(downsample.createSMA).toBeInstanceOf(Function);
  });
});

describe('direct imports', () => {
  it('should have ASAP function', () => {
    expect(ASAP2).toBeInstanceOf(Function);
    expect(ASAP2(DATA_POINTS, 2)).toMatchSnapshot();
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

  it('should have SMA function', () => {
    expect(SMA2).toBeInstanceOf(Function);
    expect(SMA2(DATA_POINTS, 1)).toMatchSnapshot();
  });

  it('should have createASAP function', () => {
    expect(createASAP2).toBeInstanceOf(Function);
  });

  it('should have createLTD function', () => {
    expect(createLTD2).toBeInstanceOf(Function);
  });

  it('should have createLTOB function', () => {
    expect(createLTOB2).toBeInstanceOf(Function);
  });

  it('should have createLTTB function', () => {
    expect(createLTTB2).toBeInstanceOf(Function);
  });

  it('should have createSMA function', () => {
    expect(createSMA2).toBeInstanceOf(Function);
  });
});
