import { Module, ModuleConstructor } from '~/Module';
import Config, { IConfig } from '~/Config';

export class JSR {
  /** Holds collection of available modules to use */
  private static fAvailableModules: ModuleConstructor[] = [];

  /** Holds modules instances */
  private fModules: Module[] = [];

  /** Holds Config instance */
  private fConfig: Config;

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
   *
   * @param module module's constructor
   */
  public static use (module: ModuleConstructor): void {
    if (module.name in JSR.fAvailableModules) {
      throw new Error(`Module ${module.name} is already in use`);
    }

    JSR.fAvailableModules.push(module);
  }

  /**
   * Creates JSR instance.
   *
   * @param config JSR configuration
   */
  constructor (config?: IConfig) {
    this.fConfig = new Config(JSR.fAvailableModules, config);
    this.fModules = this.buildModules(this.fConfig.modules);
    this.initModules(this.fModules, this.fConfig);
  }

  /**
   * Converts modules' constructors into their instances.
   */
  private buildModules (constructorList: ModuleConstructor[]): Module[] {
    return constructorList.map(moduleConstructor => new moduleConstructor());
  }

  /**
   * Initializes modules
  */
  private initModules (moduleList: Module[], config: Config): void {
    moduleList.forEach(module => module.init(config));
  }
}
