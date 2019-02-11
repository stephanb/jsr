import { ModuleConstructor } from '~/Module';

export interface IConfig {
  root: HTMLElement;
  modules: ModuleConstructor[];
}

/**
 * Serves as DTO for system config
 */
export default class Config {
  private static fDefaults: Partial<IConfig> = {
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
  constructor (config: IConfig, registeredModules: ModuleConstructor[]) {
    this.validateConfig(config);

    this.fConfig = Object.assign(
      {},
      Config.fDefaults,
      { modules: registeredModules },
      config,
    );

    // Lock config
    Object.freeze(this.fConfig);
  }

  /**
   * Returns modules to used in app
   */
  public get modules (): ModuleConstructor[] {
    return this.fConfig.modules;
  }

  /**
   * Returns root DOM element
   */
  public get rootEl (): HTMLElement {
    return this.fConfig.root;
  }

  /**
   * Validates config and throws in case of error
   */
  public validateConfig (config: IConfig): boolean {
    if (!config) {
      throw new Error('JSR: config is not given');
    }

    if (!config.root) {
      throw new Error('JSR: config.root is not defined');
    }

    if (!(config.root instanceof HTMLElement)) {
      throw new Error('JSR: config.root is not HTMLElement');
    }

    return true;
  }
}
