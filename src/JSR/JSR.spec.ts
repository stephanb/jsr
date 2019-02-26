import { Module } from '~/Module';
import { JSR } from '~/JSR/JSR';

describe('JSR static', () => {
  class FooModule implements Module { init () {/** */} }
  class BarModule implements Module { init () {/** */} }

  describe('JSR.use', () => {
    it('should throw if the same module is registered twice', () => {
      JSR.use(FooModule);

      expect(() => JSR.use(FooModule)).toThrow();
    });
  });

  describe('JSR.modules', () => {
    it('should return available modules as easy to use object', () => {
      JSR.use(FooModule);
      JSR.use(BarModule);

      const modules = JSR.modules;

      expect(Object.keys(modules).length).toBe(2);
      expect(modules.FooModule).toBe(FooModule);
      expect(modules.BarModule).toBe(BarModule);
    });
  });

  afterEach(() => {
    // Clear modules, because they are saved in static
    JSR.clearModules();
  });
});

describe('JSR', () => {
  describe('constructor', () => {
    it('should call .init on modules passed in configuration', () => {
      const mockInit = jest.fn();
      class MockModule implements Module { init () {/** */} }
      MockModule.prototype.init = mockInit;

      const jsr = new JSR({
        root: document.body,
        modules: [MockModule],
        values: [0, 100],
        min: 0,
        max: 100,
      });

      expect(mockInit).toBeCalledTimes(1);
    });
  });
});
