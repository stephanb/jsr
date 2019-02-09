import { ModuleConstructor } from '~/Module';

export interface IConfig {
  modules: ModuleConstructor[];
}

/**
 * Serves as DTO for system config
 */
export default class Config {
  private static fDefaults: IConfig = {
    modules: [], // will be overwritten by given registeredModules
  };

  /** Stores merged version of config */
  private fConfig: IConfig;

  /**
   * Creates Config DTO
   *
   * @param config config to convert into DTO
   * @param registeredModules array of available modules to use, used as fallback for config.modules
   */
  constructor (registeredModules: ModuleConstructor[], config?: IConfig) {
    this.fConfig = Object.assign(
      {},
      Config.fDefaults,
      { modules: registeredModules },
      config,
    );
  }

  /**
   * Returns modules to used in app
   */
  public get modules (): ModuleConstructor[] {
    return this.fConfig.modules;
  }
}
