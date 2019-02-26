import { Module } from '~/Module';

interface ModuleEventRequest<T> {
  id: number;
  module: Module;
  event: TConstructor<T>;
  callback: TEventCallback<any>;
}

type TConstructor<T> = new () => T;

/**
 * Event class, each event should extend this class.
 */
export class Event {}

/**
 * Event callback, can return either Promise (if async) or void (if sync).
 * Promise is useful if triggerer wants to wait for all callbacks to finish.
 */
export type TEventCallback<T> = (eventInstance: T) => Promise<void> | void;

/**
 * Handles events across modular app.
 * Because both `.subscribe` and `.trigger` methods requires to provide them with modules,
 * that execute the function, `.tiggering` event does not executes subscriptions
 * inside module that is triggering event.
 */
export class EventHandler {

  /** Holds all events requested by modules, alongside their callbacks */
  private fModuleEventRequests: ModuleEventRequest<Event>[] = [];

  /** Holds event last id for unsubscribing */
  private fEventLastId: number = 0;

  /**
   * Allows to subscribe for given event.
   *
   * @param module module that subscribes to event
   * @param event event that should be subscribed to
   * @param callback callback that should be executed
   */
  public subscribe<T extends Event> (module: Module, event: TConstructor<T>, callback: TEventCallback<T>): number {
    this.fEventLastId += 1;
    this.fModuleEventRequests.push({
      module,
      event,
      callback,
      id: this.fEventLastId,
    });

    return this.fEventLastId;
  }

  /**
   * Triggers given event in all subscriptions but triggering module.
   * Return Promise, which resolves if all callbacks finished executing.
   *
   * @param module module that triggers event
   * @param event event that should be triggered
   * @param data event instance or matching object, that should be evaluated as event value/data
   */
  public trigger<T extends Event> (module: Module, event: TConstructor<T>, data: T): Promise<void[]> {
    return Promise.all(
      this.fModuleEventRequests
        .filter((r) => r.module !== module)
        .filter((r) => r.event === event)
        .map((r) => r.callback(data)),
    );
  }

  /**
   * Unsubscribes given event. Uses eventId returned from subscribtion.
   *
   * @param eventId event id received from subscribtion
   * @return true if event was found and removed, false if not
   */
  public unsubscribe (eventId: number): boolean {
    const eventIndex = this.fModuleEventRequests.findIndex((r) => r.id === eventId);

    if (eventIndex > -1) {
      this.fModuleEventRequests.splice(eventIndex, 1);
      return true;
    } else {
      return false;
    }
  }
}
