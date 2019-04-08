import { JSR } from '~/modules/JSR/JSR';
import { Label } from '~/modules/Label/Label';
import { rAF } from '~/helpers/tests';

describe('Label', () => {
  let jsr: JSR;
  let root: Element;

  describe('no formatter', () => {
    beforeEach(async () => {
      root = document.createElement('div');
      jsr = new JSR({
        root,
        modules: [new Label()],
        values: [0, 100],
        min: 0,
        max: 100,
        step: 1,
      });

      await rAF();
    });

    it('should create two labels (one for each value)', () => {
      expect(root.querySelectorAll('.jsr_label').length).toBe(2);
    });

    it('should create labels with values equal to starting values', () => {
      const labels = root.querySelectorAll('.jsr_label');
      expect(labels[0].textContent).toBe('0');
      expect(labels[1].textContent).toBe('100');
    });
  });

  describe('formatter', () => {
    beforeEach(async () => {
      root = document.createElement('div');
      jsr = new JSR({
        root,
        modules: [new Label({
          formatter: (value) => `${value}$`,
        })],
        values: [0, 100],
        min: 0,
        max: 100,
        step: 1,
      });

      await rAF();
    });

    it('should create labels with values formatted', async () => {
      const labels = root.querySelectorAll('.jsr_label');
      expect(labels[0].textContent).toBe('0$');
      expect(labels[1].textContent).toBe('100$');
    });
  });
});
