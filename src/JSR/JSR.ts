import { Module, ModuleConstructor } from '~/Module';
import { IConfig, Config } from '~/Config/Config';
import { Renderer } from '~/Renderer/Renderer';
import { EventHandler } from '~/EventHandler/EventHandler';

import './JSR.css';

export class JSR {
  /** Holds collection of available modules to use */
  private static fAvailableModules: ModuleConstructor[] = [];

  /** Holds modules instances */
  private fModules: Module[] = [];

  /** Holds Config instance */
  private fConfig: Config;

  /** Holds Renderer instance */
  private fRenderer: Renderer;

  /** Holds EventHandler instance */
  private fEventHandler: EventHandler;

  /**
   * Returns copy of all available modules to use.
   * Returns it as friendly map of module's name (key) and constructor (value).
   */
  public static get modules (): Record<string, ModuleConstructor> {
    return this.fAvailableModules.reduce(
      (map, module) => { map[module.name] = module; return map; },
      {} as Record<string, ModuleConstructor>,
    );
  }

  /**
   * Adds module's constructor to list of available modules to use.
   * Used mainly as "use all modules by default".
   *
   * @param module module's constructor
   */
  public static use (module: ModuleConstructor): void {
    if (JSR.fAvailableModules.includes(module)) {
      throw new Error(`Module ${module.name} is already in use`);
    }

    JSR.fAvailableModules.push(module);
  }

  /**
   * Clears available modules.
   * Useful for testing.
   */
  public static clearModules (): void {
    this.fAvailableModules = [];
  }

  /**
   * Creates JSR instance.
   *
   * @param config JSR configuration
   */
  constructor (config: IConfig) {
    this.fConfig = new Config(config, JSR.fAvailableModules);
    this.fRenderer = new Renderer(this.fConfig.rootEl);
    this.fModules = this.buildModules(this.fConfig.modules);
    this.fEventHandler = new EventHandler(this.fConfig);
    this.initModules(this.fModules, this.fConfig, this.fRenderer, this.fEventHandler);
  }

  /**
   * Converts modules' constructors into their instances.
   */
  private buildModules (constructorList: ModuleConstructor[]): Module[] {
    return constructorList.map((moduleConstructor) => new moduleConstructor());
  }

  /**
   * Initializes modules.
   */
  private initModules (moduleList: Module[], config: Config, renderer: Renderer, events: EventHandler): void {
    moduleList.forEach((module) => module.init(config, renderer, events));
  }

}
