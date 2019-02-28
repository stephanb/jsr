import { Config } from '~/Config/Config';

/**
 * Event class, each event should extend this class.
 */
export class SystemEvent {
  protected fConfig: Config;

  constructor (config: Config) {
    this.fConfig = config;
  }
}
