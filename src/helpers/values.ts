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
 */
export function rewriteRatioValues (source: TValueRatio[], target: TValueRatio[]): TValueRatio[] {
  return target
    .map(
      (value, index) =>
        (value === null)                  // for null target value...
        ? source[index]                   // use source value.
        : (value < source[index - 1])     // for target value smaller than previous source...
          ? source[index - 1]             // use previous source.
          : (value > source[index + 1])   // for target value larger than following source...
            ? source[index + 1]           // use following source.
            : value < 0                   // for value smaller than 0...
              ? 0 as TValueRatio          // use 0.
              : value > 1                 // for value larget than 1...
                ? 1 as TValueRatio        // use 1.
                : value,                  // in other cases use the value
    );
}
