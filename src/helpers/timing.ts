type TReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type TArgumentTypes<T> = T extends (...args: infer U) => infer R ? U: never;
type TReturnedCallback<T> = (...args: TArgumentTypes<T>) => TReturnType<T>;

/**
 * Executes callback at max `time` interval.
 *
 * @param time interval in which callback cannot be executed again
 * @param cb callback to be called
 */
export function throttle<T extends Function> (time: number, cb: T): TReturnedCallback<T> {
  let lastCallTime: number = 0;
  return (...args: any[]) => {
    const now: number = performance.now();

    if (lastCallTime + time < now) {
      lastCallTime = now;
      return cb(...args);
    }
  };
}
