import { ModuleConstructor } from '~/Module';
import { TValueReal } from '~/types';

export interface IConfig {
  root: HTMLElement;
  modules: ModuleConstructor[];
  values: number[];
  min: number;
  max: number;
  step: number;
}

interface ICache {
  stepPrecision: number;
}

/**
 * Serves as DTO for system config.
 */
export class Config {
  private static fDefaults: Partial<IConfig> = {
    modules: [], // will be overwritten by given registeredModules
    step: 1,
  };

  private fCache: Partial<ICache> = {};

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
   * Returns minimal value from scale
   */
  public get min (): TValueReal {
    return this.fConfig.min as TValueReal;
  }

  /**
   * Returns maximum value from scale
   */
  public get max (): TValueReal {
    return this.fConfig.max as TValueReal;
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
  public get values (): TValueReal[] {
    return this.fConfig.values.slice() as TValueReal[];
  }

  /**
   * Returns step.
   */
  public get step (): TValueReal {
    return this.fConfig.step as TValueReal;
  }

  /**
   * Returns number of decimals places step has.
   * @cache
   */
  public get stepPrecision (): number {
    if (this.fCache.stepPrecision) {
      return this.fCache.stepPrecision;
    }

    const stringifiedStep: string[] = this.step.toString().split('.');

    // If any value is found after '.' then return number of it, 0 otherwise
    const stepPrecision: number = stringifiedStep[1] ? stringifiedStep[1].length : 0;

    // Save value to cache
    this.fCache.stepPrecision = stepPrecision;

    return stepPrecision;
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

    if (!Number.isFinite(config.min) || !Number.isFinite(config.max) || !Number.isFinite(config.step)) {
      throw new Error('JSR: config.min, config.max or config.step is not a valid number');
    }

    if (!Array.isArray(config.values) || config.values.length === 0 || config.values.some((v) => !Number.isFinite(v))) {
      throw new Error(`JSR: config.values is not array, is empty, or some of the values is not a number`);
    }

    return true;
  }
}
