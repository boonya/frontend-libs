import {Context, useContext} from 'react';
import {ExtendableError} from '@boonya.dev/frontend-utils';

export class MissedContextError extends ExtendableError {}

/**
 * The hook is just a wrapper around builtin `useContext`
 * but it throws and error if was rendered not in a defined context.
 *
 * The hook treats `undefined` value as missed context.
 * So, make sure your context does not contain `undefined`.
 * If you need to represent missed value, I would recommend to use `null` instead.
 */
export default function useSafeContext<T>(
  context: Context<T>,
  errorMessage = "The hook must be used within it's context provider.",
) {
  const values = useContext<T>(context);
  if (values === undefined) {
    throw new MissedContextError(errorMessage, {cause: {context}});
  }
  return values;
}
