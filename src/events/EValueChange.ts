import { TValueRatio, TValueReal } from '~/types';
import { ratioToReal, realToRatio, findClosestValueIndex, rewriteValues } from '~/helpers/values';
import { SystemEvent } from '~/EventHandler/SystemEvent';

/**
 * Emits complete set of values if any of them changes.
 */
export class EValueChange extends SystemEvent {
  private fRatioValues: TValueRatio[] = [];
  private fRealValues: TValueReal[] = [];

  /**
   * Returns changed values as real.
   */
  public get realValues (): TValueReal[] {
    return this.fRealValues;
  }

  /**
   * Sets real values and according ratio values.
   * If value is not true number, original is taken and no change is performed.
   */
  public set realValues (values: TValueReal[]) {
    this.fRealValues = rewriteValues(this.fRealValues, values, this.fConfig.min, this.fConfig.max);
    this.fRatioValues = this.fRealValues.map((value) => realToRatio(this.fConfig.min, this.fConfig.max, value));
  }

  /**
   * Returns changed values as ratio.
   */
  public get ratioValues (): TValueRatio[] {
    return this.fRatioValues;
  }

  /**
   * Sets real values and according ratio values.
   * If value is not true number, original is taken and no change is performed.
   */
  public set ratioValues (values: TValueRatio[]) {
    this.fRatioValues = rewriteValues(this.fRatioValues, values);
    this.fRealValues = this.fRatioValues.map((value) => ratioToReal(this.fConfig.min, this.fConfig.max, value));
  }

  /**
   * Allows to set single ratio value.
   * It automagically find closest value to given value, and sets it.
   */
  public set singleRatioValue (value: TValueRatio) {
    const closestValueIndex: number = findClosestValueIndex(this.fRatioValues, value);
    const newValues: TValueRatio[] = this.fRatioValues.slice();
    newValues[closestValueIndex] = value;

    this.ratioValues = newValues;
  }
}
