import { MockModule } from '~/mocks/Module';
import { EventHandler, Event } from '~/EventHandler/EventHandler';
import { Module } from '~/Module';

describe('EventHandler', () => {
  let eventHandler: EventHandler;
  const module1: Module = new MockModule();
  const module2: Module = new MockModule();

  beforeEach(() => {
    eventHandler = new EventHandler();
  });

  describe('.subscribe', () => {
    it('should return new id every time event is subscribed', () => {
      const results: number[] = [
        eventHandler.subscribe(module1, Event, jest.fn()),
        eventHandler.subscribe(module1, Event, jest.fn()),
        eventHandler.subscribe(module2, Event, jest.fn()),
        eventHandler.subscribe(module2, Event, jest.fn()),
      ];

      // Expect only one copy of each value in array, which means there are no dupes
      expect(results.filter(r => r === results[0]).length).toBe(1);
      expect(results.filter(r => r === results[1]).length).toBe(1);
      expect(results.filter(r => r === results[2]).length).toBe(1);
      expect(results.filter(r => r === results[3]).length).toBe(1);
    });
  });

  describe('subscribe + trigger', () => {
    it('should trigger registered callback', (done) => {
      const fn = jest.fn();
      const arg = {};

      eventHandler.subscribe(module1, Event, fn);
      eventHandler.trigger(module2, Event, arg).then(() => {
        expect(fn).toBeCalledTimes(1);
        expect(fn).toBeCalledWith(arg);
        done();
      });
    });

    it('should not trigger callback of its own module', (done) => {
      const fn = jest.fn();

      eventHandler.subscribe(module1, Event, fn);
      eventHandler.trigger(module1, Event, {}).then(() => {
        expect(fn).toBeCalledTimes(0);
        done();
      });
    });

    it('should wait for all callbacks before resolving trigger', (done) => {
      const jestFn1 = jest.fn();
      const jestFn2 = jest.fn();
      const fn1: () => Promise<void> = () => new Promise((resolve) => setTimeout(() => (jestFn1(), resolve()), 50));
      const fn2: () => Promise<void> = () => new Promise((resolve) => setTimeout(() => (jestFn2(), resolve()), 150));

      eventHandler.subscribe(module1, Event, fn1);
      eventHandler.subscribe(module1, Event, fn2);
      eventHandler.trigger(module2, Event, {}).then(() => {
        expect(jestFn1).toBeCalledTimes(1);
        expect(jestFn2).toBeCalledTimes(1);
        done();
      });
    });
  });

  describe('.unsubscribe', () => {
    it('should unsubscribe and trigger should not work', (done) => {
      const jestFn = jest.fn();
      const subscribtionId: number = eventHandler.subscribe(module1, Event, jestFn);

      eventHandler.unsubscribe(subscribtionId);

      eventHandler.trigger(module2, Event, {}).then(() => {
        expect(jestFn).toBeCalledTimes(0);
        done();
      });
    });
  });
});
