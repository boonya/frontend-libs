import {ReactElement, ReactNode} from 'react';

interface ParentComponentProps {
  children: ReactNode;
}

type ParentComponent = (_: ParentComponentProps) => ReactElement;

export interface ReducerProps {
  children: ReactElement;
  tree: ParentComponent[];
}

export default function Reducer({children, tree}: ReducerProps) {
  if (tree.length === 0) {
    return children;
  }

  // TODO: use `reduceRight` instead of `reverse` + `reduce`
  // eslint-disable-next-line unicorn/no-array-reduce
  return tree.reverse().reduce((inner, Warpper) => {
    return <Warpper>{inner}</Warpper>;
  }, children);
}
