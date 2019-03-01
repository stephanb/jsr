import { Renderer, RendererElement } from '~/Renderer/Renderer';
import { ViewportWidthProperty } from 'csstype';

describe('Renderer', () => {
  let parent: HTMLElement;
  let r: Renderer;

  beforeEach(() => {
    parent = document.createElement('div');
    r = new Renderer(parent);
  });

  describe('constructor', () => {
    it('should append new element to given element', () => {

      expect(parent.childElementCount).toBe(1);
    });
  });

  describe('root getter', () => {
    it('should return element created by constructor', () => {
      expect(parent.childElementCount).toBe(1);
    });
  });

  describe('createElement', () => {
    it('should return RendererElement instance', () => {
      expect(r.createElement('div')).toBeInstanceOf(RendererElement);
    });
  });
});

describe('RendererElement', () => {
  /** rAF Promise wrapper */
  const rAF: () => Promise<number> = () => {
    return new Promise((resolve) => requestAnimationFrame(resolve));
  };

  describe('element getter', () => {
    it('should return element created by constructor', () => {
      const el = new RendererElement('div');

      expect(el.element).toBeInstanceOf(HTMLElement);
      expect(el.element.tagName).toBe('DIV');
    });
  });

  describe('constructor', () => {
    it('should create element with given name', () => {
      const el = new RendererElement('div');

      expect(el.element.tagName).toBe('DIV');
    });

    it('should create element with given attributes', () => {
      const el = new RendererElement('div', {
        class: 'testClass',
        id: 'testId',
      });

      expect(el.element.getAttribute('class')).toBe('testClass');
      expect(el.element.getAttribute('id')).toBe('testId');
    });

    it('should convert camelCased attributes to kebab-cased', () => {
      const el = new RendererElement('div', {
        dataTest: 'testData',
      });

      expect(el.element.getAttribute('data-test')).toBe('testData');
      expect(el.element.dataset.test).toBe('testData');
    });

    it('should properly add children', async () => {
      const el = new RendererElement('div', null, ['foo']);
      const el2 = new RendererElement('div', null, ['bar', 'bar']);
      const el3 = new RendererElement('div', null, [el]);
      const el4 = new RendererElement('div', null, [el, 'bar']);

      await rAF();

      expect(el.element.textContent).toBe('foo');
      expect(el2.element.textContent).toBe('barbar');

      // @TODO
      // Tests below cannot be handled properly by JSDom so are disabled
      // expect(el3.element.children[0]).toBe(el.element);
      // expect(el3.element.textContent).toBe('foo');
      // expect(el4.element.children[0]).toBe(el.element);
      // expect(el4.element.textContent).toBe('foobar');
    });
  });

  describe('patchStyles', () => {
    it('should add styles to element', async () => {
      const el = new RendererElement('div');

      el.patchStyles({ left: '10px' });
      await rAF();
      expect(el.element.style.left).toBe('10px');

      el.patchStyles({ left: '20px' });
      await rAF();
      expect(el.element.style.left).toBe('20px');

      // Test if patching is properly rAFed
      el.patchStyles({ left: '30px', right: '15px' });
      expect(el.element.style.left).not.toBe('30px');
      el.patchStyles({ left: '40px' });
      await rAF();
      expect(el.element.style.left).toBe('40px');
      expect(el.element.style.right).toBe('15px');
    });
  });

  describe('html', () => {
    describe('getter', () => {
      it('should return inner html of element', async () => {
        const el = new RendererElement('div', null, ['text']);

        await rAF();

        expect(el.html).toBe('text');
      });
    });

    describe('setter', () => {
      it('should set new HTML content via rAF', async () => {
        const el = new RendererElement('div', null, ['text']);

        await rAF();

        el.html = 'foobar';
        expect(el.html).not.toBe('foobar');

        await rAF();
        expect(el.html).toBe('foobar');
      });
    });
  });
});
