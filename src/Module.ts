import { Config } from '~/Config';
import { Renderer } from '~/Renderer';

export type ModuleConstructor = {
  new (): Module;
};

export abstract class Module {

  /**
   * Initializes modules with injected core services.
   */
  public abstract init (config: Config, renderer: Renderer): void;
}
