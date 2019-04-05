import { JSR } from '~/modules/JSR/JSR';
import { Input } from '~/modules/Input/Input';

describe('Input', () => {
  /** rAF Promise wrapper */
  const rAF: () => Promise<number> = () => {
    return new Promise((resolve) => requestAnimationFrame(resolve));
  };

  let input1: HTMLInputElement;
  let input2: HTMLInputElement;
  let jsr: JSR;

  beforeEach(async () => {
    input1 = document.createElement('input');
    input2 = document.createElement('input');

    jsr = new JSR({
      root: document.body,
      modules: [new Input()],
      values: [0, 100],
      min: 0,
      max: 100,
      step: 1,
      inputs: [input1, input2],
    });

    await rAF();
  });

  it('should update given inputs on init', async () => {
    expect(input1.value).toBe('0');
    expect(input2.value).toBe('100');
  });

  it('should update given inputs after setting values programmatically', async () => {
    jsr.setValues([20, 75]);

    await rAF();

    expect(input1.value).toBe('20');
    expect(input2.value).toBe('75');
  });
});
