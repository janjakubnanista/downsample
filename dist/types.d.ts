export declare type X = number | Date;
export declare type Y = number;
export declare type TupleDataPoint = [X, Y];
export interface XYDataPoint {
    x: X;
    y: Y;
}
export declare type DataPoint = TupleDataPoint | XYDataPoint;
export declare type DataPoints = TupleDataPoint[] | XYDataPoint[];
export declare type NormalizedDataPoint = [number, number];
