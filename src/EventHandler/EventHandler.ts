import { Module } from '~/Module';
import { Config } from '~/Config/Config';
import { EValueChange } from '~/events/EValueChange';
import { SystemEvent } from '~/EventHandler/SystemEvent';

interface ModuleEventRequest<T> {
  id: number;
  module: Module;
  event: T;
  callback: TEventCallback<T>;
}

type EventData<T> = {
  [K in keyof T]?: T[K]
};

/**
 * Event callback, can return either Promise (if async) or void (if sync).
 * Promise is useful if triggerer wants to wait for all callbacks to finish.
 */
type TEventCallback<T> = (eventInstance: Readonly<T>) => Promise<void> | void;

/**
 * Handles events across modular app.
 * Because both `.subscribe` and `.trigger` methods requires to provide them with modules,
 * that execute the function, `.tiggering` event does not executes subscriptions
 * inside module that is triggering event.
 */
export class EventHandler {

  /** Holds all events requested by modules, alongside their callbacks */
  private fModuleEventRequests: ModuleEventRequest<SystemEvent>[] = [];

  /** Holds event last id for unsubscribing */
  private fEventLastId: number = 0;

  /** Holds config instance, passed down to all events later on */
  private fConfig: Config;

  /** List of events. Allows injection. Values are set in constructor */
  public event: {
    SystemEvent: SystemEvent,
    EValueChange: EValueChange,
  };

  constructor (config: Config) {
    this.fConfig = config;

    this.event = {
      SystemEvent: new SystemEvent(this.fConfig),
      EValueChange: new EValueChange(this.fConfig),
    };
  }

  /**
   * Allows to subscribe for given event.
   *
   * @param module module that subscribes to event
   * @param event event that should be subscribed to
   * @param callback callback that should be executed
   */
  public subscribe<T extends SystemEvent> (
    module: Module, event: T, callback: TEventCallback<T>,
  ): number {
    this.fEventLastId += 1;
    this.fModuleEventRequests.push({
      module,
      event,
      callback: callback as TEventCallback<SystemEvent>,
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
  public trigger<T extends SystemEvent> (
    module: Module | null, event: T, data: EventData<T>,
  ): Promise<void[]> {
    const instance: T = this.assignValues(event, data, this.fConfig);

    return Promise.all(
      this.fModuleEventRequests
        .filter((r) => r.module !== module)
        .filter((r) => r.event === event)
        .map((r) => r.callback(instance)),
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

  /**
   * Assign values from plain object to instance
   *
   * @param event instance of class to be updated
   * @param data data for constructor
   * @param config config to be passed to event instance
   */
  private assignValues<T> (event: T, data: EventData<T>, config: Config): T {
    for (const key in data) {
      event[key] = data[key] as any;
    }

    return event;
  }
}
