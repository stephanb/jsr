import { TValueRatio } from '~/types';

/**
 * Converts given ratio to percent string.
 * E.g. 0.1 -> 10%
 *
 * @param ratio ratio to convert to percents
 */
export const ratioToPercent: (ratio: TValueRatio) => string = (ratio) => {
  return `${ratio * 100}%`;
};
