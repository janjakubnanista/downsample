import { DataPoint } from "../types";
export default function LTTB<T extends DataPoint>(data: T[], desiredLength: number): T[];
