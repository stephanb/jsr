import { TValueRatio, TValueReal } from '~/types';
import { ratioToReal, realToRatio } from '~/helpers/values';
import { SystemEvent } from '~/EventHandler/SystemEvent';

/**
 * Emits complete set of values if any of them changes
 */
export class EValueChange extends SystemEvent {
  private fRatioValues: TValueRatio[];
  private fRealValues: TValueReal[];

  /**
   * Returns changed values as real
   */
  public get realValues (): TValueReal[] {
    return this.fRealValues;
  }

  /**
   * Sets real values and according ratio values
   */
  public set realValues (values: TValueReal[]) {
    this.fRealValues = values;
    this.fRatioValues = values.map((value) => realToRatio(this.fConfig.min, this.fConfig.max, value));
  }

  /**
   * Returns changed values as ratio
   */
  public get ratioValues (): TValueRatio[] {
    return this.fRatioValues;
  }

  /**
   * Sets real values and according ratio values
   */
  public set ratioValues (values: TValueRatio[]) {
    this.fRatioValues = values;
    this.fRealValues = values.map((value) => ratioToReal(this.fConfig.min, this.fConfig.max, value));
  }
}
