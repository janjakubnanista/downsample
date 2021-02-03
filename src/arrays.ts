import { AllowedArray, DownsamplingFunctionConfig } from './types';
import { getPointValueExtractor } from './utils';

export interface ArrayAccess<P> {
  x: (index: number) => number;
  y: (index: number) => number;
}
export const createArrayAccess = <P>({
  x,
  y,
}: DownsamplingFunctionConfig<P>): ((array: AllowedArray<P>) => ArrayAccess<P>) => {
  const getX = getPointValueExtractor(x);
  const getY = getPointValueExtractor(y);

  return (array: AllowedArray<P>): ArrayAccess<P> => ({
    x: (index) => getX(array[index], index),
    y: (index) => getY(array[index], index),
  });
};

export const emptyArray = <T extends ArrayLike<unknown> = ArrayLike<unknown>>(originalArray: T): T => {
  if (typeof originalArray.constructor !== 'function')
    throw new Error(`Cannot create an empty array based on '${originalArray}': constructor property is not callable`);

  return new (originalArray.constructor as any)();
};

export const arrayAs = <E, T extends PossibleArray<E> = PossibleArray<E>>(data: Array<E>, template: T): T => {
  if (template.constructor === data.constructor) return (data as unknown) as T;
  if (typeof template.constructor !== 'function')
    throw new Error(`Cannot create an array based on '${template}': constructor property is not callable`);

  return new (template.constructor as any)(data);
};
