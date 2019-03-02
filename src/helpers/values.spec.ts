import { findClosestValueIndex, realToRatio, ratioToReal, correctIntersectingValues, rewriteRatioValues } from '~/helpers/values';
import { TValueReal, TValueRatio } from '~/types';

describe('helpers/values', () => {
  describe('findClosestValueIndex', () => {
    it('should return closest value index in simple scenarios', () => {
      expect(findClosestValueIndex([0, 1, 5], 4)).toBe(2);
      expect(findClosestValueIndex([5, 5, 5], 5)).toBe(0);
      expect(findClosestValueIndex([-2, 0, 5], -2)).toBe(0);
      expect(findClosestValueIndex([0, 0, 5], 4)).toBe(2);
      expect(findClosestValueIndex([], 4)).toBe(0);
    });

    it('should return closest value index in floating point scenarios', () => {
      expect(findClosestValueIndex([0.0, 1.6, 1.9], 1.7)).toBe(1);
      expect(findClosestValueIndex([0.0, 1.6, 1.9], 1.5)).toBe(1);
      expect(findClosestValueIndex([0.0, 1.6, 1.9], 0.5)).toBe(0);
    });
  });

  describe('realToRatio', () => {
    it('should convert real number to ratio number', () => {
      expect(realToRatio(0, 100, 50 as TValueReal)).toBeCloseTo(0.5);
      expect(realToRatio(0, 1, 0.5 as TValueReal)).toBeCloseTo(0.5);
      expect(realToRatio(0, 100, 200 as TValueReal)).toBeCloseTo(2);
    });
  });

  describe('ratioToReal', () => {
    it('should convert ratio number to real number', () => {
      expect(ratioToReal(0, 100, 0.5 as TValueRatio)).toBeCloseTo(50);
      expect(ratioToReal(0, 1, 0.5 as TValueRatio)).toBeCloseTo(0.5);
      expect(ratioToReal(0, 100, 2 as TValueRatio)).toBeCloseTo(200);
    });
  });

  describe('rewriteRatioValues', () => {
    it('should rewrite values to non numeric fields', () => {
      const test1 = rewriteRatioValues([0, 0.5, 1] as TValueRatio[], [null, 0.7, null] as TValueRatio[]);
      const test2 = rewriteRatioValues([0, 0.5, 1] as TValueRatio[], [null, null, null] as any as TValueRatio[]);
      const test3 = rewriteRatioValues([0, 0.5, 1] as TValueRatio[], [0.1, 0.7, null] as TValueRatio[]);
      const test4 = rewriteRatioValues([0, 0.5, 1] as TValueRatio[], [0.3, 0.7, 0.9] as TValueRatio[]);

      expect(test1).toEqual([0, 0.7, 1]);
      expect(test2).toEqual([0, 0.5, 1]);
      expect(test3).toEqual([0.1, 0.7, 1]);
      expect(test4).toEqual([0.3, 0.7, 0.9]);
    });

    it('should rewrite values and correct invalid neighbour values relations', () => {
      const test1 = rewriteRatioValues([0.3, 0.5, 0.7] as TValueRatio[], [null, 0.2, null] as TValueRatio[]);
      const test2 = rewriteRatioValues([0.3, 0.5, 0.7] as TValueRatio[], [null, 0.8, null] as TValueRatio[]);
      const test3 = rewriteRatioValues([0.3, 0.5, 0.7] as TValueRatio[], [0.8, 0.6, null] as TValueRatio[]);
      const test4 = rewriteRatioValues([0.3, 0.5, 0.7] as TValueRatio[], [0.3, 0.7, 0.9] as TValueRatio[]);

      expect(test1).toEqual([0.3, 0.3, 0.7]);
      expect(test2).toEqual([0.3, 0.7, 0.7]);
      expect(test3).toEqual([0.7, 0.7, 0.7]);
      expect(test4).toEqual([0.3, 0.7, 0.9]);
    });
  });
});
