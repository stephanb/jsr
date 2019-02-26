import { Event } from '~/EventHandler/EventHandler';
import { TValueRatio, TValueReal } from '~/types';

/**
 * Emits complete set of values if any of them changes
 */
export class EValueChange extends Event {
  public ratioValues: TValueRatio[];
  public realValues: TValueReal[];
}
