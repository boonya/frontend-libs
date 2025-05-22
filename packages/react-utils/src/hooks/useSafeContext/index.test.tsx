import {render, renderHook, screen} from '@testing-library/react';
import {createContext} from 'react';
import useSafeContext from '@boonya.dev/react-utils/hooks/useSafeContext';

it('should throw an error rendered outside of ContextProvider', () => {
  jest.spyOn(console, 'error').mockImplementation(() => void 0);

  const TestContext = createContext(undefined);

  expect(() => renderHook(() => useSafeContext(TestContext))).toThrow(
    "The hook must be used within it's context provider.",
  );
});

it('should return null.', () => {
  // NOTE: This is intended to be null, otherwise it would treat the context as non existent.
  // eslint-disable-next-line unicorn/no-null
  const TestContext = createContext(null);

  const {result} = renderHook(() => useSafeContext(TestContext));
  expect(result.current).toBeNull();
});

it('should render context.', () => {
  const TestContext = createContext<string | undefined>(undefined);

  function ContextConsumer() {
    const context = useSafeContext(TestContext);
    return <p data-testid="context">{context}</p>;
  }

  render(
    <TestContext.Provider value="contextual value">
      <ContextConsumer />
    </TestContext.Provider>,
  );

  expect(screen.getByTestId('context')).toHaveTextContent('contextual value');
});
