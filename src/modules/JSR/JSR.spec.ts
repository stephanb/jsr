import { Module } from '~/Module';
import { JSR } from '~/modules/JSR/JSR';

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
        step: 1,
      });

      expect(mockInit).toBeCalledTimes(1);
    });
  });

  describe('values set/get', () => {
    it('should properly set and get values on JSR', () => {
      const jsr = new JSR({
        root: document.body,
        modules: [],
        values: [0, 100],
        min: 0,
        max: 100,
        step: 1,
      });

      expect(jsr.values).toEqual(expect.arrayContaining([0, 100]));
      jsr.setValues([35, 100]);
      expect(jsr.values).toEqual(expect.arrayContaining([35, 100]));
      jsr.setValues([50, null]);
      expect(jsr.values).toEqual(expect.arrayContaining([50, 100]));
      jsr.setValues([null, 75]);
      expect(jsr.values).toEqual(expect.arrayContaining([50, 75]));
    });
  });
});
