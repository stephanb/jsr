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
