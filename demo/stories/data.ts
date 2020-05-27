import { XYDataPoint } from '../../src';
import rawPowerData from '../../data/power.json';
import rawTaxiData from '../../data/taxi.json';
import rawTemperatureData from '../../data/temperature.json';

const powerData = rawPowerData.map((point, index) => ({ x: index, y: point }));
const taxiData = rawTaxiData.map((point) => ({ x: new Date(point.time).getTime(), y: point.value }));
const temperatureData = rawTemperatureData.map((point) => ({ x: point.month, y: point.value }));

export type DataFactory = () => XYDataPoint[];
export type DataType = 'power' | 'temperature' | 'taxi';

export const powerDataFactory: DataFactory = () => powerData;
export const taxiDataFactory: DataFactory = () => taxiData;
export const temperatureDataFactory: DataFactory = () => temperatureData;

export const dataFactories: Record<DataType, DataFactory> = {
  power: powerDataFactory,
  taxi: taxiDataFactory,
  temperature: temperatureDataFactory,
};
