export type X = number | Date;
export type Y = number;

export type TupleDataPoint = [X, Y];

export interface XYDataPoint {
  x: X;
  y: Y;
}

export type DataPoint = TupleDataPoint | XYDataPoint;
export type DataPoints = TupleDataPoint[] | XYDataPoint[];

export type NormalizedDataPoint = [number, number];
