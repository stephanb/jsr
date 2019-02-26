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
