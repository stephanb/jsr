import { findClosestValueIndex, realToRatio, ratioToReal } from '~/helpers/values';
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
});
