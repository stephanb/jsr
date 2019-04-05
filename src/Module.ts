import { Config } from '~/Config/Config';
import { Renderer } from '~/Renderer/Renderer';
import { EventHandler } from '~/EventHandler/EventHandler';

export type ModuleConstructor = {
  new (...args: any[]): Module;
};

export abstract class Module {

  /**
   * Initializes modules with injected core services.
   */
  public abstract init (config: Config, renderer: Renderer, events: EventHandler): void;
}
