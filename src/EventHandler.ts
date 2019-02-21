import { Module } from '~/Module';

interface ModuleEventRequest {
  module: Module;
  event: typeof Event;
  callback: TEventCallback;
}

/**
 * Event class, each event should extend this class.
 */
export class Event {}

/**
 * Event callback, can return either Promise (if async) or void (if sync).
 * Promise is useful if triggerer wants to wait for all callbacks to finish.
 */
export type TEventCallback = (eventInstance: Event) => Promise<void> | void;

/**
 * Handles events across modular app.
 * Because both `.subscribe` and `.trigger` methods requires to provide them with modules,
 * that execute the function, `.tiggering` event does not executes subscriptions
 * inside module that is triggering event.
 */
export class EventHandler {

  /** Holds all events requested by modules, alongside their callbacks */
  private fModuleEventRequests: ModuleEventRequest[] = [];

  /**
   * Allows to subscribe for given event.
   *
   * @param module module that subscribes to event
   * @param event event that should be subscribed to
   * @param callback callback that should be executed
   */
  public subscribe (module: Module, event: typeof Event, callback: TEventCallback): void {
    this.fModuleEventRequests.push({
      module,
      event,
      callback,
    });
  }

  /**
   * Triggers given event in all subscriptions but triggering module.
   * Return Promise, which resolves if all callbacks finished executing.
   *
   * @param module module that triggers event
   * @param event event that should be triggered
   * @param data event instance or matching object, that should be evaluated as event value/data
   */
  public trigger (module: Module, event: typeof Event, data: Event): Promise<void[]> {
    return Promise.all(
      this.fModuleEventRequests
        .filter(r => r.module !== module)
        .filter(r => r.event === event)
        .map(r => r.callback(data)),
    );
  }

}
