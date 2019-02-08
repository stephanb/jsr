import { Module, ModuleConstructor } from '~/Module';

interface IConfig {
  modules: ModuleConstructor[];
}

export class JSR {
  private fModules: Module[] = [];

  /** Holds collection of available modules to use */
  private static fAvailableModules: ModuleConstructor[] = [];

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
  constructor (config: IConfig) {
    const modules: ModuleConstructor[] = config.modules || JSR.fAvailableModules;
    this.fModules = this.buildModules(modules);
  }

  /**
   * Converts modules' constructors into their instances.
   */
  private buildModules (moduleList: ModuleConstructor[]): Module[] {
    return moduleList.map(moduleConstructor => new moduleConstructor());
  }
}
