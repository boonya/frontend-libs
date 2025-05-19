import {createContext} from 'react';
import {renderHook, render, screen} from '@testing-library/react';
import useSafeContext from '@boonya/react-utils/hooks/useSafeContext';

it('should throw an error rendered outside of ContextProvider', () => {
  jest.spyOn(console, 'error').mockImplementation(() => null);

  const TestContext = createContext(undefined);

  expect(() => renderHook(() => useSafeContext(TestContext))).toThrow(
    "The hook must be used within it's context provider.",
  );
});

it('should return null.', () => {
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
