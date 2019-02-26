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
