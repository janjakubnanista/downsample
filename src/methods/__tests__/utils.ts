import { DataPoint } from '../../types';

export const makeXYDateTestData = (data: number[]): DataPoint[] =>
  data.map((value, index) => ({ x: new Date(index * 3600), y: value }));

export const makeXYNumberTestData = (data: number[]): DataPoint[] =>
  data.map((value, index) => ({ x: index * 3600, y: value }));

export const makeTupleDateTestData = (data: number[]): DataPoint[] =>
  data.map((value, index) => [new Date(index * 3600), value]);

export const makeTupleNumberTestData = (data: number[]): DataPoint[] =>
  data.map((value, index) => [index * 3600, value]);
