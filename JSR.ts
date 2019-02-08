import { Module, ModuleConstructor } from '~/Module';

interface IConfig {
  modules: ModuleConstructor[];
}

export class JSR {
  private fModules: Module[] = [];

  private static fAvailableModules: Record<string, ModuleConstructor> = {};

  public static get modules (): Record<string, ModuleConstructor> {
    return { ...this.fAvailableModules };
  }

  public static use (module: ModuleConstructor): void {
    if (module.name in JSR.fAvailableModules) {
      throw new Error(`Module ${module.name} is already in use`);
    }

    JSR.fAvailableModules[module.name] = module;
  }

  constructor (config: IConfig) {
    const modules: ModuleConstructor[] = config.modules || Array.from(Object.values(JSR.modules));
    this.fModules = this.collectModules(modules);
  }

  private collectModules (moduleList: ModuleConstructor[]): Module[] {
    return moduleList.map(moduleConstructor => new moduleConstructor());
  }
}
