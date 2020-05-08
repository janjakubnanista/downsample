import 'jest';

import { LTD, LTOB, LTTB } from 'downsample';
import { LTD as LTD2 } from 'downsample/methods/LTD';
import { LTOB as LTOB2 } from 'downsample/methods/LTOB';
import { LTTB as LTTB2 } from 'downsample/methods/LTTB';
import downsample from 'downsample';

describe('imports from root', () => {
  it('should have LTD function', () => {
    expect(LTD).toBeInstanceOf(Function);
    expect(LTD([], 0)).toEqual([]);
  });

  it('should have LTOB function', () => {
    expect(LTOB).toBeInstanceOf(Function);
    expect(LTOB([], 0)).toEqual([]);
  });

  it('should have LTTB function', () => {
    expect(LTTB).toBeInstanceOf(Function);
    expect(LTTB([], 0)).toEqual([]);
  });
});

describe('default export', () => {
  it('should have LTD function', () => {
    expect(downsample.LTD).toBeInstanceOf(Function);
    expect(downsample.LTD([], 0)).toEqual([]);
  });

  it('should have LTOB function', () => {
    expect(downsample.LTOB).toBeInstanceOf(Function);
    expect(downsample.LTOB([], 0)).toEqual([]);
  });

  it('should have LTTB function', () => {
    expect(downsample.LTTB).toBeInstanceOf(Function);
    expect(downsample.LTTB([], 0)).toEqual([]);
  });
});

describe('direct imports', () => {
  it('should have LTD function', () => {
    expect(LTD2).toBeInstanceOf(Function);
    expect(LTD2([], 0)).toEqual([]);
  });

  it('should have LTOB function', () => {
    expect(LTOB2).toBeInstanceOf(Function);
    expect(LTOB2([], 0)).toEqual([]);
  });

  it('should have LTTB function', () => {
    expect(LTTB2).toBeInstanceOf(Function);
    expect(LTTB2([], 0)).toEqual([]);
  });
});
