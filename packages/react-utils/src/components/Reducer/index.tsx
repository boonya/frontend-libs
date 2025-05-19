import {ReactElement, ReactNode} from 'react';

type ParentComponentProps = {
	children: ReactNode;
};

type ParentComponent = (_: ParentComponentProps) => ReactElement;

export type ReducerProps = {
	children: ReactElement;
	tree: ParentComponent[];
};

export default function Reducer({children, tree}: ReducerProps) {
	if (!tree.length) {
		return children;
	}

	return tree.reverse().reduce((inner, Warpper) => {
		return <Warpper>{inner}</Warpper>;
	}, children);
}
