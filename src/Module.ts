import Config from '~/Config';
import { Renderer } from '~/Renderer';

export type ModuleConstructor = {
  new (): Module;
};

export abstract class Module {
  public abstract init (config: Config, renderer: Renderer): void;
}
