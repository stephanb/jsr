import { TValueRatio, TValueReal } from '~/types';
import { ratioToReal, realToRatio, findClosestValueIndex, rewriteValues, roundToStep } from '~/helpers/values';
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
    // Whole setting logic is in ratioValues
    this.ratioValues = values.map(
      (value) => Number.isFinite(value) ? realToRatio(this.fConfig.min, this.fConfig.max, value) : value as any,
    );
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
    const stepPrecision: number = this.getStepPrecision(this.fConfig.step);
    const stepRatioPrecision: number = this.getStepPrecision(this.fConfig.stepRatio);

    this.fRatioValues = rewriteValues(this.fRatioValues, values).map(
      (value) => roundToStep(
        value,
        this.fConfig.stepRatio,
        stepRatioPrecision,
      ),
    );

    this.fRealValues = this.fRatioValues.map(
      (value) => roundToStep(
        ratioToReal(this.fConfig.min, this.fConfig.max, value),
        this.fConfig.step,
        stepPrecision,
      ),
    );
  }

  /**
   * Allows to set single ratio value.
   * It automagically finds closest value to given value, and sets it.
   */
  public set singleRatioValue (value: TValueRatio) {
    const closestValueIndex: number = findClosestValueIndex(this.fRatioValues, value);
    const newValues: TValueRatio[] = this.fRatioValues.slice();
    newValues[closestValueIndex] = value;

    this.ratioValues = newValues;
  }

  /**
   * Returns number of decimals places step has.
   */
  private getStepPrecision (step: TValueRatio | TValueReal): number {
    const stringifiedStep: string[] = step.toString().split('.');

    // If any value is found after '.' then return number of it, 0 otherwise
    const stepPrecision: number = stringifiedStep[1] ? stringifiedStep[1].length : 0;

    return stepPrecision;
  }
}
