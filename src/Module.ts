import Config from '~/Config';

export type ModuleConstructor = {
  new (): Module;
};

export abstract class Module {
  public abstract init (config: Config): void;
}
