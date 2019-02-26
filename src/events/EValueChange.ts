import { Event } from '~/EventHandler/EventHandler';
import { TValueRatio, TValueReal } from '~/types';
import { ratioToReal } from '~/helpers/values';

/**
 * Emits complete set of values if any of them changes
 */
export class EValueChange extends Event {
  public ratioValues: TValueRatio[];

  /**
   * Returns changed values as real
   */
  public get realValues (): TValueReal[] {
    return this.ratioValues.map((value) => ratioToReal(this.fConfig.min, this.fConfig.max, value));
  }
}
