import {debounce} from 'lodash';

/**
 * Creates a debounced asynchronous function that delays invoking func until after wait milliseconds have elapsed
 * since the last time the debounced function was invoked.
 * The debounced function comes with a cancel method to cancel delayed func invocations
 * and a flush method to immediately invoke them.
 * Provide options to indicate whether func should be invoked on the leading and/or trailing edge of the wait timeout.
 * The func is invoked with the last arguments provided to the debounced function.
 * Subsequent calls to the debounced function return the result of the last func invocation.
 *
 * **Note:** If leading and trailing options are true, func is invoked on the trailing edge of the timeout only if the debounced function is invoked more than once during the wait timeout.
 *
 * If wait is 0 and leading is false, func invocation is deferred until to the next tick, similar to setTimeout with a timeout of 0.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/) for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @see https://lodash.com/docs/4.17.15#debounce
 *
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {object} [options] The options object.
 * @param {boolean} [options.leading=false] Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait] The maximum time func is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true] Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns new debounced function.
 */
// @ts-expect-error TODO: later
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function asyncDebounce<F extends (...args: P) => Promise<R>, P = any, R = unknown>(
  func: F,
  wait?: number,
  options?: Partial<{leading: boolean; trailing: boolean; maxWait: number}>,
): F {
  const debounced = debounce(
    async (resolve: (value: R | PromiseLike<R>) => void, reject: (v?: unknown) => void, args: P[]) => {
      try {
        // @ts-expect-error TODO: later
        const result = await func(...args);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    },
    wait,
    options,
  );

  // @ts-expect-error TODO: later
  return (...args: P[]) =>
    new Promise((resolve, reject) => {
      void debounced(resolve, reject, args);
    });
}
