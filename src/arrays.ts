import { AllowedArray } from './types';

export const emptyArray = <T extends ArrayLike<unknown> = ArrayLike<unknown>>(originalArray: T): T => {
  if (typeof originalArray.constructor !== 'function')
    throw new Error(`Cannot create an empty array based on '${originalArray}': constructor property is not callable`);

  return new (originalArray.constructor as any)();
};

export const arrayAs = <E, T extends AllowedArray<E> = AllowedArray<E>>(data: Array<E>, template: T): T => {
  if (template.constructor === data.constructor) return (data as unknown) as T;
  if (typeof template.constructor !== 'function')
    throw new Error(`Cannot create an array based on '${template}': constructor property is not callable`);

  return new (template.constructor as any)(data);
};
