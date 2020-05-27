export const makeXYDateTestData = (data: number[], maxLength?: number): { x: Date; y: number }[] =>
  data.map((value, index) => ({ x: new Date(index * 3600), y: value })).slice(0, maxLength);

export const makeXYNumberTestData = (data: number[], maxLength?: number): { x: number; y: number }[] =>
  data.map((value, index) => ({ x: index * 3600, y: value })).slice(0, maxLength);

export const makeTupleDateTestData = (data: number[], maxLength?: number): [Date, number][] =>
  data
    .map<[Date, number]>((value, index) => [new Date(index * 3600), value])
    .slice(0, maxLength);

export const makeTupleNumberTestData = (data: number[], maxLength?: number): [number, number][] =>
  data
    .map<[number, number]>((value, index) => [index * 3600, value])
    .slice(0, maxLength);
