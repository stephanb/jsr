import { ModuleConstructor } from '~/Module';

export interface IConfig {
  root: HTMLElement;
  modules: ModuleConstructor[];
  values: number[];
}

/**
 * Serves as DTO for system config.
 */
export class Config {
  private static fDefaults: Partial<IConfig> = {
    modules: [], // will be overwritten by given registeredModules
  };

  /** Stores merged version of config */
  private fConfig: IConfig;

  /**
   * Creates Config DTO.
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
   * Returns copy of modules to use in app.
   */
  public get modules (): ModuleConstructor[] {
    return this.fConfig.modules.slice();
  }

  /**
   * Returns root DOM element.
   */
  public get rootEl (): HTMLElement {
    return this.fConfig.root;
  }

  /**
   * Returns copy of initial values.
   */
  public get values (): number[] {
    return this.fConfig.values.slice();
  }

  /**
   * Validates config and throws in case of error.
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

    /** @NOTE .isNaN treats stringified number ('1') as valid number */
    if (!Array.isArray(config.values) || config.values.length === 0 || config.values.some(v => isNaN(v))) {
      throw new Error(`JSR: config.values is not array, is empty, or some of the values is not a number`);
    }

    return true;
  }
}