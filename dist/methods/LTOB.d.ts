import { DataPoint } from "../types";
export default function LTOB<T extends DataPoint>(data: T[], desiredLength: number): T[];
