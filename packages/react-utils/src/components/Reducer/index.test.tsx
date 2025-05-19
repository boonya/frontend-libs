import {PropsWithChildren, ReactNode, createContext} from 'react';
import {renderComponent, screen, within} from '@testing-library/react';
import useSafeContext from '@boonya/react-utils/hooks/useSafeContext';
import Reducer from '@boonya/react-utils/components/Reducer';

it('should properly render tree of components.', () => {
	renderComponent(
		<Reducer
			tree={[
				(props: PropsWithChildren) => <span data-testid="top" {...props} />,
				(props: PropsWithChildren) => <span data-testid="middle" {...props} />,
				(props: PropsWithChildren) => <span data-testid="bottom" {...props} />,
			]}
		>
			<span data-testid="children" />
		</Reducer>,
	);

	const top = screen.getByTestId('top');
	const middle = within(top).getByTestId('middle');
	const bottom = within(middle).getByTestId('bottom');
	within(bottom).getByTestId('children');
});

it('should render a tree of components with context.', () => {
	type ParentComponentProps = {children: ReactNode};

	const TopContext = createContext<'top' | null>(null);
	const MiddleContext = createContext<'middle' | null>(null);
	const BottomContext = createContext<'bottom' | null>(null);

	function Top({children}: ParentComponentProps) {
		return <TopContext.Provider value="top">{children}</TopContext.Provider>;
	}
	function Middle({children}: ParentComponentProps) {
		useSafeContext(TopContext);
		return <MiddleContext.Provider value="middle">{children}</MiddleContext.Provider>;
	}
	function Bottom({children}: ParentComponentProps) {
		useSafeContext(TopContext);
		useSafeContext(MiddleContext);
		return <BottomContext.Provider value="bottom">{children}</BottomContext.Provider>;
	}
	function Consumer() {
		useSafeContext(TopContext);
		useSafeContext(MiddleContext);
		useSafeContext(BottomContext);
		return <span data-testid="consumer" />;
	}

	renderComponent(
		<Reducer tree={[Top, Middle, Bottom]}>
			<Consumer />
		</Reducer>,
	);

	screen.getByTestId('consumer');
});
