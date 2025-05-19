type Method = 'info' | 'warn' | 'error';

const logFunction = (method: Method) => (message: string) => (cause?: unknown, details?: unknown) => {
  const innerCause = cause instanceof Error && cause.cause;
  const items = [message, cause, innerCause, details].filter(Boolean);
  const payload = items.flatMap((item, index) => {
    return index < items.length - 1 ? [item, '\n'] : [item];
  });
  /* eslint-disable no-console */
  console[method](...payload);
  /* eslint-enable no-console */
};

export const logInfo = logFunction('info');
export const logWarn = logFunction('warn');
export const logError = logFunction('error');
