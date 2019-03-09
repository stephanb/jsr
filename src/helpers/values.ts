import { TValueReal, TValueRatio } from '~/types';

/**
 * Converts real value to ratio.
 *
 * @param min minimum number from scale
 * @param max maximum number from scale
 * @param value value to convert
 */
export function realToRatio (min: number, max: number, value: TValueReal): TValueRatio {
  return (value - min) / (max - min) as TValueRatio;
}

/**
 * Converts ratio value to real.
 * @param min minimum number from scale
 * @param max maximum number from scale
 * @param value value to convert
 */
export function ratioToReal (min: number, max: number, value: TValueRatio): TValueReal {
  return ((max - min) * value + min) as TValueReal;
}

/**
 * Returns index of value from set, that is closest to given value
 *
 * @param valueSet set of values to look for
 * @param value value to check against
 */
export function findClosestValueIndex<T extends number> (valueSet: T[], value: T): number {
  return valueSet.reduce(
    (closestIndex, curValue, index, set) =>
      (Math.abs(curValue - value) < Math.abs(set[closestIndex] - value)) ? index : closestIndex,
    0,
  );
}

/**
 * Overwrites each not numeric value in target with value from source,
 * and performs fixing values, so they don't overlap each other or exceed 0-1
 *
 * @param source complete (filled) array of values
 * @param target array of values to be filled
 * @param min minimum value that can be set
 * @param max maximum value that can be set
 */
export function rewriteValues (
  source: TValueReal[], target: TValueReal[], min: TValueReal, max: TValueReal,
): TValueReal[];
export function rewriteValues (source: TValueRatio[], target: TValueRatio[]): TValueRatio[];
export function rewriteValues<T extends number> (
  source: T[], target: T[], min: T = 0 as T, max: T = 1 as T,
): T[] {
  return target
    .map(
      (value, index) =>
        (value === null)                  // for null target value...
        ? source[index]                   // use source value.
        : (value < source[index - 1])     // for target value smaller than previous source...
          ? source[index - 1]             // use previous source.
          : (value > source[index + 1])   // for target value larger than following source...
            ? source[index + 1]           // use following source.
            : value < min                 // for value smaller than min...
              ? min                       // use min.
              : value > max               // for value larget than max...
                ? max                     // use max.
                : value,                  // in other cases use the value
    );
}
